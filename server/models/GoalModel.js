const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  icon: {
    type: String, // String representation of the icon (e.g., 'FaGlobe')
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: String, // E.g., '2027', '2030'
  },
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
