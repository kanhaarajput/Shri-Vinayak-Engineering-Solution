const express = require('express');
const router = express.Router();
const Feature = require('../models/FeatureModel');

router.get('/', async (req, res) => {
  try {
    const data = await Feature.find().sort({ createdAt: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', express.json(), async (req, res) => {
  const item = new Feature({
    title: req.body.title,
    desc: req.body.desc,
    iconName: req.body.iconName || 'star'
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', express.json(), async (req, res) => {
  try {
    const item = await Feature.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (req.body.title != null) item.title = req.body.title;
    if (req.body.desc != null) item.desc = req.body.desc;
    if (req.body.iconName != null) item.iconName = req.body.iconName;

    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Feature.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
