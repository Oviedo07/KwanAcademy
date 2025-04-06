const express = require("express");
const { registerInstructor, signInInstructor } = require("../controllers/InstructorController");

const router = express.Router();

router.post("/api/signInInstructor", signInInstructor);
router.post("/api/registerInstructor", registerInstructor);

module.exports = router;