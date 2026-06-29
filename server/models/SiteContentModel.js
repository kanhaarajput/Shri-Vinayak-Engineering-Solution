const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  home: {
    hero: {
      titleLine1: String,
      titleHighlight: String,
      titleLine2: String,
      subtitle: String,
    },
    stats: [
      {
        value: String,
        label: String,
      },
    ],
  },
  about: {
    heading: String,
    title: String,
    description1: String,
    description2: String,
    image: String,
  },
  contact: {
    address: String,
    phone: String,
    whatsapp: String,
    email: String,
  },
});

module.exports = mongoose.model('SiteContent', siteContentSchema);
