const express = require('express');
const router = express.Router();
const Industry = require('../models/IndustryModel');

// GET all industries
router.get('/', async (req, res) => {
  try {
    const industries = await Industry.find();
    res.json(industries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new industry
router.post('/', async (req, res) => {
  const industry = new Industry({
    title: req.body.title,
    desc: req.body.desc,
    iconName: req.body.iconName,
    color: req.body.color,
  });

  try {
    const newIndustry = await industry.save();
    res.status(201).json(newIndustry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an industry
router.put('/:id', async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) return res.status(404).json({ message: 'Cannot find industry' });

    if (req.body.title != null) industry.title = req.body.title;
    if (req.body.desc != null) industry.desc = req.body.desc;
    if (req.body.iconName != null) industry.iconName = req.body.iconName;
    if (req.body.color != null) industry.color = req.body.color;

    const updatedIndustry = await industry.save();
    res.json(updatedIndustry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an industry
router.delete('/:id', async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) return res.status(404).json({ message: 'Cannot find industry' });
    
    await industry.deleteOne();
    res.json({ message: 'Deleted Industry' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
