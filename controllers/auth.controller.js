const User = require("../models/users.model");
const { sendEmail } = require("../config/nodemailer.js");
const jwt = require("jsonwebtoken");
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const initiateLogin = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    user.otp = {
      code: otp,
      expiresAt: otpExpiry,
    };
    await user.save();

    await sendEmail(
      email,
      "Login OTP",
      `Your OTP is: ${otp}. Valid for 10 minutes.`
    );

    res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
    
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.otp || user.otp.code !== otp) {
      throw new Error("Invalid OTP");
    }

    if (new Date() > user.otp.expiresAt) {
      throw new Error("OTP expired");
    }

    user.otp = undefined;
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).send({message: "User not found"});
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
module.exports = {
  initiateLogin,
  verifyOTP,
  getUserById
};
