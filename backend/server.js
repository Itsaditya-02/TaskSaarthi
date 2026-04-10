require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const passport = require("passport");
require("./config/passport");

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
