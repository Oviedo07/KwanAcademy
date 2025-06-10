// ComprasController.js
const getConnection = require("../config/db");

const registrarCompra = async (req, res) => {
  try {
    const db = await getConnection();
    const {
      id_usuario,
      id_curso,
      precio,
      numero_factura,
      detalles_pago // Opcional: para guardar detalles adicionales del pago
    } = req.body;

    // Validaciones básicas
    if (!id_usuario || !id_curso || !precio || !numero_factura) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: id_usuario, id_curso, precio, numero_factura'
      });
    }

    // Verificar que el curso existe
    const [cursoExists] = await db.execute(
      'SELECT id FROM curso WHERE id = ?',
      [id_curso]
    );

    if (cursoExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'El curso especificado no existe'
      });
    }

    // Verificar si ya existe una compra con el mismo número de factura
    const [facturaExists] = await db.execute(
      'SELECT id FROM compra WHERE numero_factura = ?',
      [numero_factura]
    );

    if (facturaExists.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe una compra con este número de factura'
      });
    }

    // Insertar la compra
    const [result] = await db.execute(
      `INSERT INTO compra
       (id_usuario, id_curso, precio, estado, numero_factura, fecha_creacion, fecha_actualizacion) 
       VALUES (?, ?, ?, 'Comprado', ?, NOW(), NOW())`,
      [id_usuario, id_curso, precio, numero_factura]
    );

    // Obtener la compra recién creada con información del curso
    const [compraCompleta] = await db.execute(
    `SELECT 
        c.id,
        c.id_usuario,
        c.id_curso,
        c.precio,
        c.estado,
        c.numero_factura,
        c.fecha_creacion,
        curso.nombre AS nombre_curso,
        curso.descripcion AS descripcion_curso,
        instructor.primer_nombre AS nombre_instructor,
        instructor.primer_apellido AS apellido_instructor
    FROM compra c
    JOIN curso curso ON c.id_curso = curso.id
    LEFT JOIN instructor instructor ON curso.id_instructor = instructor.id
    WHERE c.id = ?`,
    [result.insertId]
    );


    res.status(201).json({
      success: true,
      message: 'Compra registrada exitosamente',
      data: {
        compra: compraCompleta[0]
      }
    });

  } catch (error) {
    console.error('Error al registrar compra:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const obtenerInfoCurso = async (req, res) => {
  try {
    const db = await getConnection();
    const { id_curso } = req.params;

    if (!id_curso) {
      return res.status(400).json({
        success: false,
        message: 'ID del curso es requerido'
      });
    }

    const [resultado] = await db.execute(
    `SELECT 
        curso.id,
        curso.nombre,
        curso.descripcion,
        curso.precio,
        curso.imagen_url,
        CONCAT(instructor.primer_nombre, ' ', instructor.primer_apellido) AS nombre_instructor,
        instructor.email AS email_instructor
    FROM curso curso
    LEFT JOIN instructor instructor ON curso.id_instructor = instructor.id
    WHERE curso.id = ?`,
    [id_curso]
    );


    if (resultado.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.json({
      success: true,
      data: resultado[0]
    });

  } catch (error) {
    console.error('Error al obtener información del curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const obtenerComprasUsuario = async (req, res) => {
  try {
    const db = await getConnection();
    const { id_usuario } = req.params;

    if (!id_usuario) {
      return res.status(400).json({
        success: false,
        message: 'ID del usuario es requerido'
      });
    }
    const [compras] = await db.execute(
    `SELECT 
        c.id,
        c.precio,
        c.estado,
        c.numero_factura,
        c.fecha_creacion,
        curso.nombre AS nombre_curso,
        curso.imagen_url AS imagen_curso,
        CONCAT(instructor.primer_nombre, ' ', instructor.primer_apellido) AS nombre_instructor
    FROM compra c
    JOIN curso curso ON c.id_curso = curso.id
    LEFT JOIN instructor instructor ON curso.id_instructor = instructor.id
    WHERE c.id_usuario = ?
    ORDER BY c.fecha_creacion DESC`,
    [id_usuario]
    );


    res.json({
      success: true,
      data: compras
    });

  } catch (error) {
    console.error('Error al obtener compras del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const verificarCompra = async (req, res) => {
  try {
    const db = await getConnection();
    const { id_usuario, id_curso } = req.params;

    if (!id_usuario || !id_curso) {
      return res.status(400).json({
        success: false,
        message: 'ID del usuario e ID del curso son requeridos'
      });
    }

    const [resultado] = await db.execute(
      `SELECT id, estado, fecha_creacion 
       FROM compra 
       WHERE id_usuario = ? AND id_curso = ? AND estado = 'Comprado'`,
      [id_usuario, id_curso]
    );

    res.json({
      success: true,
      comprado: resultado.length > 0,
      data: resultado.length > 0 ? resultado[0] : null
    });

  } catch (error) {
    console.error('Error al verificar compra:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  registrarCompra,
  obtenerInfoCurso,
  obtenerComprasUsuario,
  verificarCompra
};