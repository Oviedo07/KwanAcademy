const express = require("express");
const { signIn, registerUser } = require("../controllers/UserController");

const router = express.Router();

router.post("/api/signin", signIn);
router.post("/api/register", registerUser);

module.exports = router;
