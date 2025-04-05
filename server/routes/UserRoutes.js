const express = require("express");
const { signIn, registerUser, sessionUser, getUsuariosActivos, getUsuariosInactivos, updateStatusUsuarios, updateUserProfile } = require("../controllers/UserController");

const router = express.Router();

router.post("/api/signin", signIn);
router.post("/api/register", registerUser);
router.get("/api/sessionUser", sessionUser);
router.get("/api/usuariosActivos", getUsuariosActivos);
router.get("/api/usuariosInactivos", getUsuariosInactivos);
router.put("/api/updateStatusUsuarios", updateStatusUsuarios);
router.put("/api/updateUserProfile/:id", updateUserProfile);

module.exports = router;
