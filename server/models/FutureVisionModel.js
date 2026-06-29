const mongoose = require('mongoose');

const FutureVisionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Cloudinary URL
  },
}, { timestamps: true });

module.exports = mongoose.model('FutureVision', FutureVisionSchema);
