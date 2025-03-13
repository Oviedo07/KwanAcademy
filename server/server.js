const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configurar conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos.");
});

// Ruta para autenticación
app.post("/api/signin", (req, res) => {
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
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
