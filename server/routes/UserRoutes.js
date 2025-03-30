const express = require("express");
const { signIn, registerUser, sessionUser } = require("../controllers/UserController");

const router = express.Router();

router.post("/api/signin", signIn);
router.post("/api/register", registerUser);
router.get("/api/sessionUser", sessionUser);

module.exports = router;
