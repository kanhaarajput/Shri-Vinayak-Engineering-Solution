const express = require('express');
const router = express.Router();
const Innovation = require('../models/InnovationModel');
const { upload } = require('../config/cloudinary');

// GET innovation data
router.get('/', async (req, res) => {
  try {
    const innovation = await Innovation.findOne();
    res.json(innovation || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST innovation (Create or Update single document)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let innovation = await Innovation.findOne();
    
    if (innovation) {
      // Update existing
      innovation.title = req.body.title || innovation.title;
      innovation.description = req.body.description || innovation.description;
      if (req.file) {
        innovation.image = req.file.path;
      } else if (req.body.image !== undefined) {
        innovation.image = req.body.image;
      }
      const updatedInnovation = await innovation.save();
      res.json(updatedInnovation);
    } else {
      // Create new
      const newInnovation = new Innovation({
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.path : req.body.image,
      });
      const savedInnovation = await newInnovation.save();
      res.status(201).json(savedInnovation);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE innovation
router.delete('/:id', async (req, res) => {
  try {
    const innovation = await Innovation.findById(req.params.id);
    if (!innovation) return res.status(404).json({ message: 'Not found' });
    
    await innovation.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
