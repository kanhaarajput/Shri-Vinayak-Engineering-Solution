const express = require('express');
const router = express.Router();
const Goal = require('../models/GoalModel');

// GET all goals
router.get('/', async (req, res) => {
  try {
    // Sort by year ascending as default
    const goals = await Goal.find().sort({ year: 1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new goal
router.post('/', async (req, res) => {
  const goal = new Goal({
    icon: req.body.icon,
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a goal
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Cannot find goal' });

    if (req.body.icon != null) goal.icon = req.body.icon;
    if (req.body.title != null) goal.title = req.body.title;
    if (req.body.description != null) goal.description = req.body.description;
    if (req.body.year != null) goal.year = req.body.year;

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Cannot find goal' });
    
    await goal.deleteOne();
    res.json({ message: 'Deleted Goal' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
