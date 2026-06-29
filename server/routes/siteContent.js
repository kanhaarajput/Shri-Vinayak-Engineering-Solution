const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContentModel');

// GET site content
router.get('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      // Create default if none exists
      content = new SiteContent({
        home: {
          hero: {
            titleLine1: 'Advanced',
            titleHighlight: 'Laser Welding',
            titleLine2: '& VMC Wirecut Solutions',
            subtitle: 'Precision engineering services for aerospace, automotive, and medical industries.',
          },
          stats: [
            { value: '25+', label: 'Years Experience' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '50+', label: 'Expert Engineers' },
          ],
        },
        about: {
          heading: 'Who We Are',
          title: 'Engineering Precision, Delivering Excellence',
          description1: 'Shri Vinayak Engineering Solutions specialises in advanced laser welding.',
          description2: 'Built on a foundation of 25+ years of industrial excellence.',
          image: '',
        },
        contact: {
          address: 'IMT Manesar, Gurugram',
          phone: '+91 7505487656',
          whatsapp: '917505487656',
          email: 'svengg24@gmail.com',
        },
        global: {
          companyName: 'Shri Vinayak',
          companySubtitle: 'Engineering Solutions',
          logoUrl: '',
        },
      });
      await content.save();
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (update) site content
router.put('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent(req.body);
    } else {
      content.home    = req.body.home    || content.home;
      content.about   = req.body.about   || content.about;
      content.contact = req.body.contact || content.contact;
      content.global  = req.body.global  || content.global;
      content.gallery = req.body.gallery || content.gallery;
    }

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
