const mongoose = require('mongoose');

const machinerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  specs: { type: [String], required: true }, // Array of strings
  image: { type: String, required: true } // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Machinery', machinerySchema);
