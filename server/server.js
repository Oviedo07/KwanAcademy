const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes")
const { user } = require("@heroui/react");
const session = require("express-session");

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Cambia esto al frontend que use tu app en producción
  credentials: true
} // Permite el uso de cookies y autenticación
));

app.use(express.json());

// Sesion de admins
app.use(session({
  secret: "clave_secreta", // Cambia esto por una clave segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true si usas HTTPS
}));

//Rutas para CRUD Usuario
app.use(UserRoutes);
//Rutas para CRUD Administrador
app.use(AdminRoutes);
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
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});

