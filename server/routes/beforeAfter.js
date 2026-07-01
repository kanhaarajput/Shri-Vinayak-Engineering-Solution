const express = require('express');
const router = express.Router();
const BeforeAfter = require('../models/BeforeAfterModel');

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await BeforeAfter.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  const item = new BeforeAfter({
    title: req.body.title,
    description: req.body.description,
    beforeImage: req.body.beforeImage,
    afterImage: req.body.afterImage,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an item
router.put('/:id', async (req, res) => {
  try {
    const item = await BeforeAfter.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find item' });

    if (req.body.title != null) item.title = req.body.title;
    if (req.body.description != null) item.description = req.body.description;
    if (req.body.beforeImage != null) item.beforeImage = req.body.beforeImage;
    if (req.body.afterImage != null) item.afterImage = req.body.afterImage;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await BeforeAfter.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find item' });
    
    await item.deleteOne();
    res.json({ message: 'Deleted Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
