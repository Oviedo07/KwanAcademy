
require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err);
  } else {
    console.log('✅ Conectado a base de datos en MySQL');
  }
});

module.exports = db;

