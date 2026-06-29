const mongoose = require('mongoose');

const beforeAfterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BeforeAfter', beforeAfterSchema);
