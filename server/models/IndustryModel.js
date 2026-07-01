const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  iconName: { type: String, default: 'FaIndustry' },
  color: { type: String, default: '#38bdf8' },
  image: { type: String, default: '' }
});

module.exports = mongoose.model('Industry', industrySchema);
