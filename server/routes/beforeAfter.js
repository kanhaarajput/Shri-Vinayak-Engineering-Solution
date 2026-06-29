const express = require('express');
const router = express.Router();
const BeforeAfter = require('../models/BeforeAfterModel');
const { upload } = require('../config/cloudinary');

// GET all before/after comparisons
router.get('/', async (req, res) => {
  try {
    const items = await BeforeAfter.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new before/after comparison
router.post('/', upload.fields([{ name: 'beforeImage', maxCount: 1 }, { name: 'afterImage', maxCount: 1 }]), async (req, res) => {
  const item = new BeforeAfter({
    title: req.body.title,
    beforeImage: req.files?.['beforeImage'] ? req.files['beforeImage'][0].path : req.body.beforeImage,
    afterImage: req.files?.['afterImage'] ? req.files['afterImage'][0].path : req.body.afterImage,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE before/after comparison
router.delete('/:id', async (req, res) => {
  try {
    const item = await BeforeAfter.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
