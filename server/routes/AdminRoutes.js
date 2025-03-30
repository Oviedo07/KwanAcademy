const express = require("express");
const {signInAdmin, sessionAdmin, getAdmin, registerAdmin, updateAdmin, deleteAdmin} = require("../controllers/AdminController");

const router = express.Router();

router.post("/api/signInAdmin", signInAdmin);
router.get("/api/sessionAdmin", sessionAdmin);
router.get("/api/getAdmin", getAdmin);
router.post("/api/registerAdmin", registerAdmin);
router.put("/api/updateAdmin", updateAdmin);
router.delete("/api/deleteAdmin/:id", deleteAdmin);


module.exports = router;

