const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'kwan_db',
});

module.exports = db;
