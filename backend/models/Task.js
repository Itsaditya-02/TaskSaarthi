const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['work', 'personal', 'fitness', 'education', 'other'],
    default: 'work'
  },
  dueDate: {
    type: Date
  },
  user: {
    type: String, // We'll use the email or ID from JWT later
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);