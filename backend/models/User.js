const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google Auth users
  googleId: { type: String },
  githubId: { type: String },
  avatar: { type: String },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastLogin: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function() {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("User", userSchema);
