const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const InstructorRoutes = require("./routes/InstructorRoutes");
const session = require("express-session");
const path = require('path');
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
dotenv.config();
app.use(session({
  secret: "clave_secreta",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,  httpOnly: true,
  sameSite: 'lax' }
}));

app.use(UserRoutes);
app.use(AdminRoutes);
app.use(InstructorRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

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
  } else {
    console.log("Conexión Exitosa A DB")
    return;
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
