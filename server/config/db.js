// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function getConnection() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    console.log('✅ Conectado a base de datos en MySQL');
    return db;
  } catch (err) {
    console.error('❌ Error conectando a MySQL:', err);
    throw err;
  }
}

module.exports = getConnection;

