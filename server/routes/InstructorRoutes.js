const express = require("express");
const {
  registerInstructor,
  signInInstructor,
  registerCurso,
  updateCurso,
  getCursos,
  getCursoById,
  getCursosByInstructor,
  deleteCurso,
  sessionInstructor
} = require("../controllers/InstructorController");

const router = express.Router();

router.post("/api/signInInstructor", signInInstructor);
router.post("/api/registerInstructor", registerInstructor);
router.post("/api/registerCurso", registerCurso);
router.put("/api/updateCurso/:id", updateCurso);
router.get("/api/getCursos", getCursos);
router.get("/api/getCurso/:id", getCursoById);
router.get("/api/getCursosByInstructor/:id", getCursosByInstructor);
router.delete("/api/deleteCurso/:id", deleteCurso);
router.get("/api/sessionInstructor", sessionInstructor);

module.exports = router;
