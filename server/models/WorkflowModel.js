const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  step: { type: String, required: true }, // e.g. "01"
  title: { type: String, required: true },
  desc: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Workflow', workflowSchema);
