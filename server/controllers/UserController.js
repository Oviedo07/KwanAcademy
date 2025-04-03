const db = require("../config/db");

// Controlador para autenticación
const signIn = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM Usuario WHERE email = ? AND contrasena = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        res.json({ message: "Autenticación exitosa. Usuario logueado", user: results[0] });
    });
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
const registerUser = (req, res) => {
    console.log("📥 Datos recibidos en el backend:", req.body);

    const { nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol } = req.body;

    if (!nombre || !apellido || !fecha_nacimiento || !genero || !email || !contrasena || !id_rol) {
        console.error("⚠️ Faltan datos en el registro.");
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "INSERT INTO Usuario (nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [nombre, apellido, fecha_nacimiento, genero, email, contrasena, id_rol];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("❌ Error SQL:", err);
            return res.status(500).json({ error: "Error en la base de datos", details: err.message });
        }
        console.log("✅ Usuario registrado correctamente");
        res.json({ message: "Usuario registrado con éxito" });
    });
};


// Obtener Usuarios

const getUsuariosActivos = (req, res) => {
    let estado = 'activo';
    db.query("SELECT * FROM Usuario WHERE estado = '"+estado+"'", (err, result) => {
      if (err) {
        console.log("Error en la consulta:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(result);
      }
    });
  };
  
const getUsuariosInactivos = (req, res) => {
    let estado = 'inactivo';
    db.query("SELECT * FROM Usuario WHERE estado = '"+ estado +"'", (err, result) => {
      if (err) {
        console.log("Error en la consulta:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(result);
      }
    });
  };
  
const updateStatusUsuarios = (req, res) => {
    const { id, estado} = req.body;
  
    db.query(
      "UPDATE Usuario SET estado=? WHERE id=?",
      [estado, id],
      (err, result) => {
        if (err) {
          console.log("Error en la consulta:", err);
          res.status(500).json({ error: "Error en el servidor" });
        } else {
          res.json(result);
        }
      }
    );
  };
  

// Exportar funciones
module.exports = {
    signIn,
    registerUser,
    sessionUser,
    getUsuariosActivos,
    getUsuariosInactivos,
    updateStatusUsuarios
};


