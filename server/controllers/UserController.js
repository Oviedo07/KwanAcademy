const db = require("../config/db");

// Controlador signIn.js en el backend
const signIn = (req, res) => {
  const { email, password, role } = req.body;
  
  console.log(`Intento de login: ${email}, rol: ${role}`);

  // Asumiendo que tienes una tabla Usuario con estos campos
  const query = "SELECT * FROM Usuario WHERE email = ? AND contrasena = ?";
  
  db.query(query, [email, password], (err, results) => {
      if (err) {
          console.error("Error en consulta SQL:", err);
          return res.status(500).json({ error: "Error en el servidor" });
      }
      
      console.log(`Resultados encontrados: ${results.length}`);
      
      if (results.length === 0) {
          return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      
      const usuario = results[0];
      console.log("Usuario encontrado:", usuario);
      
      // Formatear la respuesta para el frontend - IMPORTANTE
      const userData = {
          id: usuario.id,
          nombre: usuario.nombre,           // Estos son los campos de tu DB
          apellido: usuario.apellido,
          email: usuario.email,
          fecha_nacimiento: usuario.fecha_nacimiento,
          genero: usuario.genero,
          role: role || 'general',          // Añadimos el rol
          token: "token123456"              // Aquí generarías un JWT real
      };
      
      res.json({ 
          message: "Autenticación exitosa",
          user: userData 
      });
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

  // Ejemplo de endpoint para actualizar perfil (para backend - NodeJS)
// Ruta: /api/user/:id
const updateUserProfile = (req, res) => {
  const userId = req.params.id;
  const { nombre, apellido, email, contrasena, fecha_nacimiento, genero } = req.body;
  
  // Construir la consulta SQL dinámicamente
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
  
  // Añadir el ID al final de los valores
  updateValues.push(userId);
  
  const query = `UPDATE Usuario SET ${updateFields.join(", ")} WHERE id = ?`;
  
  db.query(query, updateValues, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Error al actualizar el perfil" });
    }
    
    res.json({ success: true, message: "Perfil actualizado correctamente" });
  });
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


