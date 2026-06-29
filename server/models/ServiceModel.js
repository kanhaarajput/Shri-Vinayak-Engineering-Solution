const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  iconName: { type: String, default: 'HiStar' },
  image: { type: String },
  color: { type: String, default: '#fbbf24' },
  benefits: { type: [String], default: [] },
  applications: { type: [String], default: [] },
  features: { type: [String], default: [] }
});

module.exports = mongoose.model('Service', serviceSchema);
