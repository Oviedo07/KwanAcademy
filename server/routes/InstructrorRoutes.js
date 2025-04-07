const express = require("express");
const multer = require("multer");
const { 
  registerInstructor, 
  signInInstructor, 
  registerCurso, 
  updateCurso 
} = require("../controllers/InstructorController");

const router = express.Router();

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads/'); // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada imagen
  }
});

const upload = multer({ storage });

// Rutas
router.post("/api/signInInstructor", signInInstructor);
router.post("/api/registerInstructor", registerInstructor);

// Aquí usamos Multer para manejar la imagen que viene del formulario
router.post("/api/registerCurso", upload.single("imagen"), registerCurso);

// También usamos Multer en caso de que se actualice la imagen en la edición
router.put("/api/updateCurso", upload.single("imagen"), updateCurso);

module.exports = router;
