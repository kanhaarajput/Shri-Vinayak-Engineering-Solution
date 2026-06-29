const mongoose = require('mongoose');

const InnovationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Cloudinary URL
  },
}, { timestamps: true });

module.exports = mongoose.model('Innovation', InnovationSchema);
