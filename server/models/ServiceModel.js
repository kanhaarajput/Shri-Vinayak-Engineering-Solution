const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  iconName: { type: String, default: 'HiStar' },
  image: { type: String },
  color: { type: String, default: '#fbbf24' },
});

module.exports = mongoose.model('Service', serviceSchema);
