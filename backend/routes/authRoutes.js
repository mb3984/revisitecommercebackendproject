import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("Signup request body:", req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering admin", user });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request body:", req.body);
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
  res.json({ message: "Admin login succesfully", token });
});
export default router;
