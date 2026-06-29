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
        servicesPage: {
          title: 'Our Services',
          subtitle: 'Comprehensive Industrial Solutions',
        },
        galleryPage: {
          title: 'Our Work Gallery',
          subtitle: 'Showcasing Precision Engineering & Excellence',
        },
        cta: {
          title: 'Ready to Transform Your Manufacturing Process?',
          subtitle: 'Get in touch with our experts today to discuss your specific requirements.',
          buttonText: 'Request a Quote',
          image: '',
        },
        whyChooseUs: {
          title: 'Why Choose Shri Vinayak?',
          subtitle: 'We deliver uncompromising quality and precision.',
          features: [
            { title: 'Advanced Tech', description: 'State-of-the-art machinery.', icon: 'Cpu' },
            { title: 'Expert Team', description: 'Highly skilled professionals.', icon: 'Users' }
          ],
        },
        workflow: {
          title: 'Our Process',
          subtitle: 'How we turn ideas into reality.',
          steps: [
            { title: 'Consultation', description: 'Understanding your requirements.' },
            { title: 'Execution', description: 'Precision manufacturing.' }
          ],
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
      content.home = req.body.home || content.home;
      content.about = req.body.about || content.about;
      content.contact = req.body.contact || content.contact;
      if (req.body.servicesPage) content.servicesPage = req.body.servicesPage;
      if (req.body.galleryPage) content.galleryPage = req.body.galleryPage;
      if (req.body.cta) content.cta = req.body.cta;
      if (req.body.whyChooseUs) content.whyChooseUs = req.body.whyChooseUs;
      if (req.body.workflow) content.workflow = req.body.workflow;
    }

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
