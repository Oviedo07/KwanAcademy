const express = require("express");
const {
  registerInstructor,
  signInInstructor,
  sessionInstructor,
  updateInstructor,
  getSummaryInstructor,
  getSalesInstructor
} = require("../controllers/InstructorController");

const router = express.Router();

router.post("/api/signInInstructor", signInInstructor);
router.post("/api/registerInstructor", registerInstructor);
router.put("/api/updateInstructor/:id", updateInstructor);
router.get("/api/sessionInstructor", sessionInstructor);
router.get('/api/getSummaryInstructor', getSummaryInstructor);
router.get('/api/getSalesInstructor', getSalesInstructor)


module.exports = router;
