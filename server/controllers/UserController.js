
const db = require("../config/db");

// Controlador signIn.js en el backend
const signIn = async (req, res) => {
  const { email, password, role } = req.body;
  
  console.log(`Intento de login: ${email}, rol: ${role}`);

  const query = "SELECT * FROM Usuario WHERE email = ? AND contrasena = ?";

  try {
    const [results] = await db.query(query, [email, password]);
    console.log(`Resultados encontrados: ${results.length}`);

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = results[0];
    console.log("Usuario encontrado:", usuario);

    const userData = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      fecha_nacimiento: usuario.fecha_nacimiento,
      genero: usuario.genero,
      role: role || 'general',
      token: "token123456" // Aquí deberías generar un JWT real
    };

    res.json({
      message: "Autenticación exitosa",
      user: userData
    });
  } catch (error) {
    console.error("Error en consulta SQL:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};



// Verificar sesion de usuario
const sessionUser = (req, res) => {
    if (req.session.user) {
        res.json({ message: "Sesión activa", user: req.session.user });
    } else {
        res.status(401).json({ error: "No hay sesión activa" });
    }
};


// Controlador para registrar usuario
const registerUser = async (req, res) => {
  try {
    console.log("📥 Datos recibidos en el backend:", req.body);
    const { nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol } = req.body;

    if (!nombre || !apellido || !fecha_nacimiento || !genero || !email || !contrasena || !id_rol) {
      console.error("⚠️ Faltan datos en el registro.");
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "INSERT INTO Usuario (nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol];

    const [results] = await db.query(query, values);
    console.log("✅ Usuario registrado correctamente");
    res.json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error("❌ Error SQL:", err);
    res.status(500).json({ error: "Error en la base de datos", details: err.message });
  }
};


// Obtener Usuarios

const getUsuariosActivos = async (req, res) => {
  try {
    const estado = 'activo';
    const [result] = await db.query("SELECT * FROM Usuario WHERE estado = ?", [estado]);
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
  
const getUsuariosInactivos = async (req, res) => {
  try {
    const estado = 'inactivo';
    const [result] = await db.query("SELECT * FROM Usuario WHERE estado = ?", [estado]);
    res.json(result);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

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

  // Ejemplo de endpoint para actualizar perfil (para backend - NodeJS)
// Ruta: /api/user/:id
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { nombre, apellido, email, contrasena, fecha_nacimiento, genero } = req.body;

    let updateFields = [];
    let updateValues = [];

    if (nombre) {
      updateFields.push("nombre = ?");
      updateValues.push(nombre);
    }
    if (apellido) {
      updateFields.push("apellido = ?");
      updateValues.push(apellido);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (contrasena) {
      updateFields.push("contrasena = ?");
      updateValues.push(contrasena);
    }
    if (fecha_nacimiento) {
      updateFields.push("fecha_nacimiento = ?");
      updateValues.push(fecha_nacimiento);
    }
    if (genero) {
      updateFields.push("genero = ?");
      updateValues.push(genero);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ success: false, error: "No se proporcionaron campos a actualizar" });
    }

    // Agregar el ID del usuario al final de los valores
    updateValues.push(userId);

    const query = `UPDATE Usuario SET ${updateFields.join(", ")} WHERE id = ?`;

    const [results] = await db.query(query, updateValues);
    res.json({ success: true, message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el perfil:", err);
    res.status(500).json({ success: false, error: "Error al actualizar el perfil" });
  }
};

// Exportar funciones
module.exports = {
    signIn,
    registerUser,
    sessionUser,
    getUsuariosActivos,
    getUsuariosInactivos,
    updateStatusUsuarios,
    updateUserProfile
};
