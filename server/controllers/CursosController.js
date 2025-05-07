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

// Obtener un curso específico por ID
const getCursoById = async (req, res) => {
  try {
    const db = await getConnection();
    const { id } = req.params;

    const [results] = await db.query(`
      SELECT c.id, c.nombre, c.descripcion, c.objetivos, c.precio, c.imagen_url, 
             c.fecha_creacion, i.primer_nombre AS instructor_nombre, i.primer_apellido AS instructor_apellido
      FROM curso c
      JOIN instructor i ON c.id_instructor = i.id
      WHERE c.id = ?
    `, [id]);
    

    if (results.length === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const curso = results[0];
    const formattedCurso = {
      id: curso.id,
      name: curso.nombre,
      price: curso.precio,
      description: curso.descripcion,
      instructor: `${curso.instructor_nombre} ${curso.instructor_apellido}`,
      objetivos: curso.objetivos,
      image: curso.imagen_url,
      fecha_creacion: curso.fecha_creacion
    };

    res.status(200).json(formattedCurso);
  } catch (error) {
    console.error('Error en servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

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

// Obtener todas las categorías únicas
// const getCategorias = async (req, res) => {
//   try {
//     const db = await getConnection();

//     const [results] = await db.query(`
//       SELECT DISTINCT categoria FROM curso WHERE categoria IS NOT NULL
//     `);

//     const categorias = results.map(row => row.categoria);
//     res.status(200).json(categorias);
//   } catch (error) {
//     console.error('Error en servidor:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

module.exports = {
  getAllCursos,
  getCursoById,
  getCursosByCategory
};

