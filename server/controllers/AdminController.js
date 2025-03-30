const db = require("../config/db");


const signInAdmin = (req, res) => {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "SELECT * FROM Administrador WHERE email = ? AND contrasena = ?";
    
    db.query(query, [email, contrasena], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const user = results[0];

        // Guardar datos en la sesión
        req.session.user = { id: user.id, email: user.email, role: "admin" };

        res.json({ message: "Autenticación exitosa", user: { id: user.id, email: user.email } });
    });
};

// Verfificar sesion de administradores
const sessionAdmin = (req, res) => {
    if (req.session.user) {
        res.json({ message: "Sesión activa", user: req.session.user });
    } else {
        res.status(401).json({ error: "No hay sesión activa" });
    }
};


// Controlador para obtener los administradores
const getAdmin = (req, res) => {
    db.query("SELECT * FROM Administrador", (err, result) => {
        if (err) {
          console.log("Error en la consulta:", err);
          res.status(500).json({ error: "Error en el servidor" });
        } else {
          res.json(result);
        }
    });   
}

// Controlador para registrar nuevos administradores
const registerAdmin = (req, res) => {
    const { nombre, apellido, email, contrasena, telefono, rol } = req.body;

    const sql =
      "INSERT INTO Administrador (nombre, apellido, email, contrasena, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)";
  
    db.query(sql, [nombre, apellido, email, contrasena, telefono, rol], (err, result) => {
      if (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send("Error al registrar el empleado");
      } else {
        res.send("Empleado registrado con éxito");
      }
    });
}

// Controlador para editar datos de administradores
const updateAdmin = (req, res) => {
    const { id, nombre, apellido, email, contrasena, telefono, rol } = req.body;

    db.query(
      "UPDATE Administrador SET nombre=?, apellido=?, email=?, contrasena=?, telefono=?, rol=? WHERE id=?",
      [nombre, apellido, email, contrasena, telefono, rol, id],
      (err, result) => {
        if (err) {
          console.log("Error en la consulta:", err);
          res.status(500).json({ error: "Error en el servidor" });
        } else {
          res.json(result);
        }
      }
    );
}

// Controlador para eliminar administradores
const deleteAdmin = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM Administrador WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.log("Error en la consulta:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json({ message: "Registro eliminado correctamente" });
      }
    });
}

module.exports = {
    signInAdmin,
    sessionAdmin,
    getAdmin, 
    registerAdmin,
    updateAdmin,
    deleteAdmin
}