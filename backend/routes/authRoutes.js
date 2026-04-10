const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

// Permissive Auth: Accepts any email/password
router.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({ name: name || "Explorer", email, password: "nopassword" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, xp: user.xp, streak: user.streak } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({ name: "Explorer", email, password: "nopassword" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, xp: user.xp, streak: user.streak } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
