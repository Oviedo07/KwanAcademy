const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoutes");
const { user } = require("@heroui/react");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Rutas para CRUD Usuario
app.use(userRoutes);

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

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});

