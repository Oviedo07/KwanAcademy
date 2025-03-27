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
        res.json({ message: "Autenticación exitosa", user: results[0] });
    });
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

// Exportar funciones
module.exports = {
    signIn,
    registerUser
};
