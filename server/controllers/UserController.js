const db = require("../config/db");

// INICIO DE SESIÓN CON SESIÓN
const signIn = async (req, res) => {
  const { email, password, role } = req.body;

  console.log(`Intento de login: ${email}, rol: ${role}`);

  const query = "SELECT * FROM Usuario WHERE email = ? AND contrasena = ?";

  try {
    const [results] = await db.query(query, [email, password]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = results[0];
    console.log("✅ Usuario encontrado:", usuario);

    const userData = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      fecha_nacimiento: usuario.fecha_nacimiento,
      genero: usuario.genero,
      role: role || 'general'
    };

    // 🔐 Guardar en sesión
    req.session.user = userData;
    req.session.save(() => {
      res.json({
        message: "Autenticación exitosa",
        user: userData
      });
    });

  } catch (error) {
    console.error("❌ Error en consulta SQL:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// VERIFICAR SESIÓN ACTIVA
const sessionUser = (req, res) => {
  if (req.session && req.session.user) {
    console.log("✅ Sesión activa:", req.session.user);
    res.json({ message: "Sesión activa", user: req.session.user });
  } else {
    console.log("❌ No hay sesión activa");
    res.status(401).json({ error: "No hay sesión activa" });
  }
};

// REGISTRAR USUARIO
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol } = req.body;

    if (!nombre || !apellido || !fecha_nacimiento || !genero || !email || !contrasena || !id_rol) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

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
    const userId = req.params.id;
    const { nombre, apellido, email, contrasena, fecha_nacimiento, genero } = req.body;

    let updateFields = [];
    let updateValues = [];

    if (nombre) updateFields.push("nombre = ?"), updateValues.push(nombre);
    if (apellido) updateFields.push("apellido = ?"), updateValues.push(apellido);
    if (email) updateFields.push("email = ?"), updateValues.push(email);
    if (contrasena) updateFields.push("contrasena = ?"), updateValues.push(contrasena);
    if (fecha_nacimiento) updateFields.push("fecha_nacimiento = ?"), updateValues.push(fecha_nacimiento);
    if (genero) updateFields.push("genero = ?"), updateValues.push(genero);

    if (updateFields.length === 0) {
      return res.status(400).json({ success: false, error: "No se proporcionaron campos a actualizar" });
    }

    updateValues.push(userId);
    const query = `UPDATE Usuario SET ${updateFields.join(", ")} WHERE id = ?`;

    await db.query(query, updateValues);
    res.json({ success: true, message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el perfil:", err);
    res.status(500).json({ success: false, error: "Error al actualizar el perfil" });
  }
};

module.exports = {
  signIn,
  registerUser,
  sessionUser,
  getUsuariosActivos,
  getUsuariosInactivos,
  updateStatusUsuarios,
  updateUserProfile
};
