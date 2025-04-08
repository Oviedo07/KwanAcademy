const express = require("express");
const mysql = require("mysql2/promise"); // importante
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const InstructorRoutes = require("./routes/InstructorRoutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "clave_secreta",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(UserRoutes);
app.use(AdminRoutes);
app.use(InstructorRoutes);

async function startServer() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    console.log("Conexión Exitosa A DB");

    // 👉 Aquí puedes inyectar la conexión si necesitas usarla fuera
    app.locals.db = db;

    app.listen(5000, () => {
      console.log("Servidor corriendo en http://localhost:5000");
    });
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
}

startServer();
