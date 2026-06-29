const express = require('express');
const router = express.Router();
const Category = require('../models/CategoryModel');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories.map(c => c.name));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a category
router.delete('/:name', async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.name });
    if (!category) return res.status(404).json({ message: 'Cannot find category' });
    
    await category.deleteOne();
    res.json({ message: 'Deleted Category' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
