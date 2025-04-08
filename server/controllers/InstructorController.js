const db = require("../config/db");

const signInInstructor = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const query = "SELECT * FROM Instructor WHERE email = ?";
    const [results] = await db.query(query, [email]);

    if (results.length === 0 || results[0].contrasena !== contrasena) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const instructor = results[0];
    const userData = {
      id: instructor.id,
      nombre: instructor.primer_nombre,
      apellido: instructor.primer_apellido,
      email: instructor.email,
      role: 'instructor',
      token: "token123456"
    };

    if (req.session) req.session.user = userData;

    res.json({ message: "Autenticación exitosa", user: userData });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor", details: err.message });
  }
};

const sessionInstructor = (req, res) => {
  if (req.session?.user?.role === 'instructor') {
    res.json({ message: "Sesión de instructor activa", user: req.session.user });
  } else {
    res.status(401).json({ error: "No hay sesión de instructor activa" });
  }
};

const registerInstructor = async (req, res) => {
  try {
    const {
      tipo_documento, numero_identificacion, primer_nombre, segundo_nombre = null,
      primer_apellido, segundo_apellido = null, genero, numero_telefonico,
      ocupacion, descripcion_perfil, email, contrasena
    } = req.body;

    if (!tipo_documento || !numero_identificacion || !primer_nombre || !primer_apellido ||
        !genero || !numero_telefonico || !ocupacion || !descripcion_perfil || !email || !contrasena) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben ser llenados" });
    }

    const id_rol = 4;
    const query = `INSERT INTO Instructor (
      tipo_documento, numero_identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
      genero, numero_telefonico, ocupacion, descripcion_perfil, email, contrasena, id_rol
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      tipo_documento, numero_identificacion, primer_nombre, segundo_nombre,
      primer_apellido, segundo_apellido, genero, numero_telefonico,
      ocupacion, descripcion_perfil, email, contrasena, id_rol
    ];

    await db.query(query, values);
    res.status(201).json({ message: "Instructor registrado con éxito" });
  } catch (err) {
    res.status(500).json({ error: "Error en la base de datos", details: err.message });
  }
};

const registerCurso = async (req, res) => {
  try {
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
  try {
    const cursoId = req.params.id;
    const { id_instructor, nombre, descripcion, objetivos, precio } = req.body;

    const [cursoActual] = await db.query('SELECT * FROM curso WHERE id = ?', [cursoId]);

    if (cursoActual.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (req.session?.user?.id !== parseInt(id_instructor)) {
      return res.status(403).json({ error: 'No tienes permiso para editar este curso' });
    }

    const fecha_actualizacion = new Date();

    const sql = `
      UPDATE curso SET 
        nombre = ?, descripcion = ?, objetivos = ?, precio = ?, fecha_actualizacion = ?
      WHERE id = ? AND id_instructor = ?
    `;

    const [result] = await db.query(sql, [
      nombre, descripcion, objetivos, precio, fecha_actualizacion, cursoId, id_instructor
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Curso no encontrado o sin permiso para editarlo' });
    }

    res.json({ message: 'Curso actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso', details: error.message });
  }
};

const getCursos = async (req, res) => {
  try {
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
  signInInstructor,
  registerInstructor,
  registerCurso,
  updateCurso,
  sessionInstructor,
  getCursos,
  getCursoById,
  getCursosByInstructor,
  deleteCurso
};
