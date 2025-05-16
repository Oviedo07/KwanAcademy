const getConnection = require('../config/db');

// Obtener todos los cursos con información del instructor
const getAllCursos = async (req, res) => {
  try {
    const db = await getConnection();

    const [results] = await db.query(`
      SELECT c.id, c.nombre, c.descripcion, c.objetivos, c.precio, c.imagen_url, 
             c.fecha_creacion, i.primer_nombre AS instructor_nombre, i.primer_apellido AS instructor_apellido
      FROM curso c
      JOIN instructor i ON c.id_instructor = i.id
    `);
    
    const formattedResults = results.map(curso => ({
      id: curso.id,
      name: curso.nombre,
      price: curso.precio,
      description: curso.descripcion,
      instructor: `${curso.instructor_nombre} ${curso.instructor_apellido}`,
      objetivos: curso.objetivos,
      image: curso.imagen_url,
      fecha_creacion: curso.fecha_creacion
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error('Error en servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// // Obtener un curso específico por ID
// const getCursoById = async (req, res) => {
//   try {
//     const db = await getConnection();
//     const { id } = req.params;

//     const [results] = await db.query(`
//       SELECT c.id, c.nombre, c.descripcion, c.objetivos, c.precio, c.imagen_url, 
//              c.fecha_creacion, i.primer_nombre AS instructor_nombre, i.primer_apellido AS instructor_apellido
//       FROM curso c
//       JOIN instructor i ON c.id_instructor = i.id
//       WHERE c.id = ?
//     `, [id]);
    

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Curso no encontrado' });
//     }

//     const curso = results[0];
//     const formattedCurso = {
//       id: curso.id,
//       name: curso.nombre,
//       price: curso.precio,
//       description: curso.descripcion,
//       instructor: `${curso.instructor_nombre} ${curso.instructor_apellido}`,
//       objetivos: curso.objetivos,
//       image: curso.imagen_url,
//       fecha_creacion: curso.fecha_creacion
//     };

//     res.status(200).json(formattedCurso);
//   } catch (error) {
//     console.error('Error en servidor:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// Obtener cursos por categoría
const getCursosByCategory = async (req, res) => {
  try {
    const db = await getConnection();
    const { categoria } = req.params;

    const [results] = await db.query(`
      SELECT c.id, c.nombre, c.descripcion, c.objetivos, c.precio, c.imagen_url, 
             c.fecha_creacion, i.primer_nombre AS instructor_nombre, i.primer_apellido AS instructor_apellido, c.categoria
      FROM curso c
      JOIN instructor i ON c.id_instructor = i.id
      WHERE c.categoria = ?
    `, [categoria]);
    

    const formattedResults = results.map(curso => ({
      id: curso.id,
      name: curso.nombre,
      price: curso.precio,
      description: curso.descripcion,
      instructor: `${curso.instructor_nombre} ${curso.instructor_apellido}`,
      objetivos: curso.objetivos,
      image: curso.imagen_url,
      category: curso.categoria,
      fecha_creacion: curso.fecha_creacion
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error('Error en servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const registerCurso = async (req, res) => {
  try {
    const db = await getConnection();
    const { id_instructor, nombre, descripcion, objetivos, precio, imagen } = req.body;

    if (!id_instructor || !nombre || !descripcion || !objetivos || !precio || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const fecha = new Date();
    const sql = `
      INSERT INTO curso (id_instructor, nombre, descripcion, objetivos, precio, imagen_url, fecha_creacion, fecha_actualizacion)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      id_instructor, nombre, descripcion, objetivos, precio, imagen, fecha, fecha
    ]);

    res.status(201).json({
      message: 'Curso creado exitosamente',
      cursoId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso', details: error.message });
  }
};

const updateCurso = async (req, res) => {
  const cursoId = req.params.id;
  const { nombre, descripcion, objetivos, precio } = req.body;

  if (!req.session.user || req.session.user.rol !== 'instructor') {
    return res.status(403).json({ error: "Acceso denegado. No hay sesión activa o rol incorrecto." });
  }

  console.log("🔒 Usuario autenticado (updateCurso):", req.session.user);

  try {
    const db = await getConnection();

    const [result] = await db.query(
      'UPDATE curso SET nombre = ?, descripcion = ?, objetivos = ?, precio = ?, fecha_actualizacion = NOW() WHERE id = ? AND id_instructor = ?',
      [nombre, descripcion, objetivos, precio, cursoId, req.session.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Curso no encontrado o no autorizado" });
    }

    res.json({ message: "Curso actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar curso:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


const getCursos = async (req, res) => {
  try {
    const db = await getConnection();

    const [cursos] = await db.query(`
      SELECT c.*, CONCAT(i.primer_nombre, ' ', i.primer_apellido) AS nombre_instructor
      FROM curso c
      JOIN instructor i ON c.id_instructor = i.id
      ORDER BY c.fecha_creacion DESC
    `);

    res.json({ cursos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

const getCursoById = async (req, res) => {
  try {
    const db = await getConnection();
    const cursoId = req.params.id;

    const [cursos] = await db.query(`
      SELECT c.*, 
             CONCAT(i.primer_nombre, ' ', i.primer_apellido) AS nombre_instructor,
             i.email AS email_instructor,
             i.descripcion_perfil
      FROM curso c
      JOIN instructor i ON c.id_instructor = i.id
      WHERE c.id = ?
    `, [cursoId]);

    if (cursos.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.json({ curso: cursos[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};

const getCursosByInstructor = async (req, res) => {
  try {
    const db = await getConnection();
    const instructorId = req.params.id;

    const [cursos] = await db.query(`
      SELECT c.*, 
             CONCAT(i.primer_nombre, ' ', i.primer_apellido) AS nombre_instructor
      FROM curso c
      JOIN instructor i ON c.id_instructor = i.id
      WHERE c.id_instructor = ?
      ORDER BY c.fecha_creacion DESC
    `, [instructorId]);

    res.json({ cursos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos del instructor' });
  }
};

const deleteCurso = async (req, res) => {
  try {
    const db = await getConnection();
    const cursoId = req.params.id;
    const userId = req.session.user.id;

    const [curso] = await db.query('SELECT * FROM curso WHERE id = ? AND id_instructor = ?', [cursoId, userId]);

    if (curso.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado o sin permiso' });
    }

    await db.query('DELETE FROM curso WHERE id = ?', [cursoId]);

    res.json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
};

module.exports = {
  getAllCursos,
  getCursoById,
  getCursosByCategory,
  registerCurso,
  updateCurso,
  getCursos,
  getCursosByInstructor,
  deleteCurso
};

