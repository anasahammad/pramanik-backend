const express = require("express");
const { initiateLogin, verifyOTP, getUserById } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", initiateLogin);
router.post("/verify-otp", verifyOTP);
router.get("/me/:id", getUserById)
module.exports = router;
