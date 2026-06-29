const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // Cloudinary URL
  },
  launchDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Installed'],
    default: 'Upcoming',
  },
  order: {
    type: Number,
    default: 0,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Machine', MachineSchema);
