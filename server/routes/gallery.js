const express = require('express');
const router = express.Router();
const Gallery = require('../models/GalleryModel');
const { upload } = require('../config/cloudinary');

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new gallery item
router.post('/', upload.single('image'), async (req, res) => {
  const item = new Gallery({
    title: req.body.title,
    category: req.body.category,
    image: req.file ? req.file.path : req.body.image,
    description: req.body.description,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a gallery item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find item' });

    if (req.body.title != null) item.title = req.body.title;
    if (req.body.category != null) item.category = req.body.category;
    if (req.body.description != null) item.description = req.body.description;
    if (req.file) {
      item.image = req.file.path;
    } else if (req.body.image != null) {
      item.image = req.body.image;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a gallery item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find item' });
    
    // Note: Optionally we can delete the image from Cloudinary here using its public_id
    await item.deleteOne();
    res.json({ message: 'Deleted Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
