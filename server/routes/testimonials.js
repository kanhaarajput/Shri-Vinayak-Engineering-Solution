const express = require('express');
const router = express.Router();
const Testimonial = require('../models/TestimonialModel');
const { upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const item = new Testimonial({
    name: req.body.name,
    role: req.body.role,
    content: req.body.content,
    rating: req.body.rating || 5,
    image: req.file ? req.file.path : req.body.image
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (req.body.name != null) item.name = req.body.name;
    if (req.body.role != null) item.role = req.body.role;
    if (req.body.content != null) item.content = req.body.content;
    if (req.body.rating != null) item.rating = req.body.rating;
    if (req.file) item.image = req.file.path;
    else if (req.body.image != null) item.image = req.body.image;

    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
