const express = require('express');
const router = express.Router();
const { getAllCursos, 
        getCursoById, 
        getCursosByCategory,
        registerCurso,
        updateCurso,
        getCursos,
        getCursosByInstructor,
        deleteCurso
    } = require("../controllers/CursosController")

// Ruta para obtener todos los cursos
router.get('/api/getAllcursos', getAllCursos);
// Ruta para obtener un curso específico por ID
router.get('/api/getCursoById/:id', getCursoById);
// Ruta para obtener cursos por categoría
router.get('api/getCursosByCategory/:categoria', getCursosByCategory);
// // Ruta para obtener todas las categorías únicas
// router.get('api/getCategorias/todas', getCategorias);

router.post("/api/registerCurso", registerCurso);
router.put("/api/updateCurso/:id", updateCurso);
router.get("/api/getCursos", getCursos);
router.get("/api/getCurso/:id", getCursoById);
router.get("/api/getCursosByInstructor/:id", getCursosByInstructor);
router.delete("/api/deleteCurso/:id", deleteCurso);
module.exports = router;