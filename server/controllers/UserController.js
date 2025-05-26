const getConnection = require("../config/db");
const { validationResult } = require('express-validator');

// INICIO DE SESIÓN CON SESIÓN
const signIn = async (req, res) => {
  const { email, password} = req.body;
  try {
    const db = await getConnection();

    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE email = ? AND contrasena = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const usuario = rows[0];

    req.session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      genero: usuario.genero,
      contrasena: usuario.contrasena, 
      fecha_nacimiento: usuario.fecha_nacimiento,
      rol: 'usuario'
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

const sessionUser = (req, res) => {
  if (req.session && req.session.user) {
    console.log("✅ Sesión activa:", req.session.user);
    res.status(200).json({ session: req.session.user });
  } else {
    console.log("❌ No hay sesión activa");
    res.status(401).json({ error: "No hay sesión activa" });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Error al cerrar sesión:", err);
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid"); // Nombre de la cookie de sesión (por defecto en Express)
    console.log("✅ Sesión eliminada");
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  });
};


// REGISTRAR USUARIO
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol } = req.body;

    if (!nombre || !apellido || !fecha_nacimiento || !genero || !email || !contrasena || !id_rol) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const db = await getConnection();
    const query = "INSERT INTO Usuario (nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol];

    await db.query(query, values);
    res.json({ message: "Usuario registrado con éxito" });

  } catch (err) {
    console.error("❌ Error SQL:", err);
    res.status(500).json({ error: "Error en la base de datos", details: err.message });
  }
};

// OBTENER USUARIOS ACTIVOS
const getUsuariosActivos = async (req, res) => {
  try {
    const db = await getConnection();
    const [result] = await db.query("SELECT * FROM Usuario WHERE estado = 'activo'");
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// OBTENER USUARIOS INACTIVOS
const getUsuariosInactivos = async (req, res) => {
  try {
    const db = await getConnection();
    const [result] = await db.query("SELECT * FROM Usuario WHERE estado = 'inactivo'");
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// CAMBIAR ESTADO DE USUARIO
const updateStatusUsuarios = async (req, res) => {
  try {
    const { id, estado } = req.body;
    const db = await getConnection();
    const [result] = await db.query("UPDATE Usuario SET estado = ? WHERE id = ?", [estado, id]);
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ACTUALIZAR PERFIL
const updateUserProfile = async (req, res) => {
try {
    const db = await getConnection();
    const { id } = req.params;
    const {
      nombre,
      apellido,
      email,
      genero,
      fecha_nacimiento,
    } = req.body;

    // Verificamos los campos obligatorios
    if (!email) {
      return res.status(400).json({ message: 'El email es obligatorio' });
    }

    const params = [
      nombre || '',
      apellido || '',
      email || '',         // Este campo lo mantienes aunque no parece venir del frontend
      genero || '',
      fecha_nacimiento || '',
      id
    ];

    const sql = `
      UPDATE usuario
      SET nombre = ?, apellido = ?, email = ?, genero = ?, fecha_nacimiento = ?
      WHERE id = ?`;

    const [result] = await db.execute(sql, params);

    res.json({ message: 'Usuario actualizado correctamente', affectedRows: result.affectedRows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar instructor', error: error.message });
  }
};

// ---------------------------------------------------------------


// LIMPIA LOCALSTORAGE
const cleanStorage = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.clearCookie('connect.sid'); // Cambia el nombre si tu cookie tiene otro
    res.send('Sesión cerrada');
  });
};









//-------------------------------------------

module.exports = {
  signIn,
  registerUser,
  sessionUser,
  logoutUser,
  getUsuariosActivos,
  getUsuariosInactivos,
  updateStatusUsuarios,
  cleanStorage,
  updateUserProfile
};
