// CompraRoutes.js
const express = require('express');
const router = express.Router();
const {
  registrarCompra,
  obtenerInfoCurso,
  obtenerComprasUsuario,
  verificarCompra
} = require('../controllers/ComprasController');

// Rutas para compras
router.post('/api/compras/registrar', registrarCompra);
router.get('/api/cursos/:id_curso/info', obtenerInfoCurso);
router.get('/api/usuarios/:id_usuario/compras', obtenerComprasUsuario);
router.get('/api/usuarios/:id_usuario/cursos/:id_curso/verificar', verificarCompra);

module.exports = router;