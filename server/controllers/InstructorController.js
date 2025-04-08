const getConnection = require("../config/db");

const signInInstructor = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const db = await getConnection();

    const [rows] = await db.query(
      'SELECT * FROM instructor WHERE email = ? AND contrasena = ?',
      [email, contrasena]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const usuario = rows[0];

    req.session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      primer_nombre: usuario.primer_nombre,
      primer_apellido: usuario.primer_apellido,
      email: usuario.email,
      rol: 'instructor'
    };

    console.log("🔎 Usuario en sesión (updateCurso):", req.session.user);

    req.session.save(() => {
      res.json({ message: "Inicio de sesión exitoso", user: req.session.user });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const sessionInstructor = (req, res) => {
  if (req.session && req.session.user) {
    console.log("✅ Sesión activa:", req.session.user);
    res.status(200).json({ session: req.session.user });
  } else {
    console.log("❌ No hay sesión activa");
    res.status(401).json({ error: "No hay sesión activa" });
  }
};

const registerInstructor = async (req, res) => {
  try {
    const db = await getConnection();
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
