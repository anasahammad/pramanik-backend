const express = require("express");
const { initiateLogin, verifyOTP } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", initiateLogin);
router.post("/verify-otp", verifyOTP);

module.exports = router;
