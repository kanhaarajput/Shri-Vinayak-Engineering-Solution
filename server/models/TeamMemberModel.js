const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  about: { type: String, required: true },
  image: { type: String, default: '' },
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
