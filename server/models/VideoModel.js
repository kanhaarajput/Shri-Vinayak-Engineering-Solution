const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL to cloudinary or external image
  videoUrl: { type: String }, // Optional actual video URL
});

module.exports = mongoose.model('Video', videoSchema);
