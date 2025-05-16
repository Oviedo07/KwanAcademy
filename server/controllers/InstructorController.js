const getConnection = require("../config/db");
const { validationResult } = require('express-validator');

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
      tipo_documento: usuario.tipo_documento,
      numero_identificacion: usuario.numero_identificacion,
      primer_nombre: usuario.primer_nombre,
      segundo_nombre: usuario.segundo_nombre,
      primer_apellido: usuario.primer_apellido,
      segundo_apellido: usuario.segundo_apellido,
      email: usuario.email,
      genero: usuario.genero,
      numero_telefonico: usuario.numero_telefonico,
      contrasena: usuario.contrasena, 
      ocupacion: usuario.ocupacion,
      descripcion_perfil: usuario.descripcion_perfil,
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

// -------------------------------------
const updateInstructor = async (req, res) => {
  try {
    const db = await getConnection();
    const { id } = req.params;
    const {
      tipo_documento,          // Añadido este campo que faltaba
      numero_identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      email,
      ocupacion,
      descripcion_perfil,
      numero_telefonico
    } = req.body;

    // Verificamos los campos obligatorios
    if (!tipo_documento) {
      return res.status(400).json({ message: 'El tipo de documento es obligatorio' });
    }

    const params = [
      tipo_documento,
      numero_identificacion || '',
      primer_nombre || '',
      segundo_nombre || '',
      primer_apellido || '',
      segundo_apellido || '',
      email || '',         // Este campo lo mantienes aunque no parece venir del frontend
      ocupacion || '',
      descripcion_perfil || '',
      numero_telefonico || '',
      id
    ];

    const sql = `
      UPDATE instructor
      SET tipo_documento = ?, numero_identificacion = ?, primer_nombre = ?, segundo_nombre = ?,
          primer_apellido = ?, segundo_apellido = ?, email = ?, ocupacion = ?,
          descripcion_perfil = ?, numero_telefonico = ?
      WHERE id = ?`;

    const [result] = await db.execute(sql, params);

    res.json({ message: 'Instructor actualizado correctamente', affectedRows: result.affectedRows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar instructor', error: error.message });
  }
};

module.exports = {
  signInInstructor,
  registerInstructor,
  sessionInstructor,
  updateInstructor
};
