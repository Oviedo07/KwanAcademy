const express = require('express');
const router = express.Router();
const {getAllCursos, getCursoById, getCursosByCategory} = require("../controllers/CursosController")

// Ruta para obtener todos los cursos
router.get('/api/getAllcursos', getAllCursos);

// Ruta para obtener un curso específico por ID
router.get('/api/getCursoById/:id', getCursoById);

// Ruta para obtener cursos por categoría
router.get('api/getCursosByCategory/:categoria', getCursosByCategory);

// // Ruta para obtener todas las categorías únicas
// router.get('api/getCategorias/todas', getCategorias);

module.exports = router;