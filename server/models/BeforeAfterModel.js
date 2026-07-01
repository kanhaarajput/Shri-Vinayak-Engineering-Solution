const mongoose = require('mongoose');

const beforeAfterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BeforeAfter', beforeAfterSchema);
