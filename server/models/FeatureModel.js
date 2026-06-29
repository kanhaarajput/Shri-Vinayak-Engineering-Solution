const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  iconName: { type: String, default: 'star' } // Store icon reference
}, { timestamps: true });

module.exports = mongoose.model('Feature', featureSchema);
