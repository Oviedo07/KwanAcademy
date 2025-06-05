const express = require("express");
const {
  registerInstructor,
  signInInstructor,
  sessionInstructor,
  updateInstructor,
  getSummaryInstructor
} = require("../controllers/InstructorController");

const router = express.Router();

router.post("/api/signInInstructor", signInInstructor);
router.post("/api/registerInstructor", registerInstructor);
router.put("/api/updateInstructor/:id", updateInstructor);
router.get("/api/sessionInstructor", sessionInstructor);
router.get('/api/getSummaryInstructor', getSummaryInstructor);


module.exports = router;
