const express = require("express");
const { signIn, registerUser, sessionUser, getUsuariosActivos, getUsuariosInactivos, updateStatusUsuarios } = require("../controllers/UserController");

const router = express.Router();

router.post("/api/signin", signIn);
router.post("/api/register", registerUser);
router.get("/api/sessionUser", sessionUser);
router.get("/api/usuariosActivos", getUsuariosActivos);
router.get("/api/usuariosInactivos", getUsuariosInactivos);
router.put("/api/updateStatusUsuarios", updateStatusUsuarios);

module.exports = router;
