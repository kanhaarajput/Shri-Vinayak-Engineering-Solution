const express = require('express');
const router = express.Router();
const Machinery = require('../models/MachineryModel');
const { upload } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const data = await Machinery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  let specsArray = [];
  try {
    specsArray = JSON.parse(req.body.specs);
  } catch(e) {
    specsArray = Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs];
  }

  const item = new Machinery({
    name: req.body.name,
    specs: specsArray,
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
    const item = await Machinery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (req.body.name != null) item.name = req.body.name;
    if (req.body.specs != null) {
      try {
        item.specs = JSON.parse(req.body.specs);
      } catch(e) {
        item.specs = Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs];
      }
    }
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
    const item = await Machinery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
