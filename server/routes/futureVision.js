const express = require('express');
const router = express.Router();
const FutureVision = require('../models/FutureVisionModel');
const { upload } = require('../config/cloudinary');

// GET future vision
router.get('/', async (req, res) => {
  try {
    const vision = await FutureVision.findOne();
    res.json(vision || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST future vision (Create or Update single document)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let vision = await FutureVision.findOne();
    
    if (vision) {
      // Update existing
      vision.title = req.body.title || vision.title;
      vision.subtitle = req.body.subtitle || vision.subtitle;
      vision.description = req.body.description || vision.description;
      if (req.file) {
        vision.image = req.file.path;
      } else if (req.body.image !== undefined) {
        vision.image = req.body.image;
      }
      const updatedVision = await vision.save();
      res.json(updatedVision);
    } else {
      // Create new
      const newVision = new FutureVision({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        image: req.file ? req.file.path : req.body.image,
      });
      const savedVision = await newVision.save();
      res.status(201).json(savedVision);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE future vision (mostly for reset purposes)
router.delete('/:id', async (req, res) => {
  try {
    const vision = await FutureVision.findById(req.params.id);
    if (!vision) return res.status(404).json({ message: 'Not found' });
    
    await vision.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
