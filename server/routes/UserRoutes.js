const express = require("express");
const multer = require('multer');
const { signIn, registerUser, sessionUser, getUsuariosActivos, getUsuariosInactivos, updateStatusUsuarios, updateUserProfile } = require("../controllers/UserController");
const path = require('path');
const router = express.Router();


// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, 'curso-' + uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB límite
    },
    fileFilter: function(req, file, cb) {
      // Validar tipos de archivos
      const filetypes = /jpeg|jpg|png|gif|webp/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Error: El archivo debe ser una imagen válida (jpeg, jpg, png, gif, webp)'));
    }
});

// Middleware para verificar autenticación
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.id) {
      return next();
    }
    return res.status(401).json({ error: 'No autorizado' });
};

router.post("/api/signin", signIn);
router.post("/api/register", registerUser);
router.get("/api/sessionUser", sessionUser);
router.get("/api/usuariosActivos", getUsuariosActivos);
router.get("/api/usuariosInactivos", getUsuariosInactivos);
router.put("/api/updateStatusUsuarios", updateStatusUsuarios);
router.put("/api/updateUserProfile/:id", updateUserProfile);

module.exports = router;
