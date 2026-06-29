const express = require('express');
const router = express.Router();
const Workflow = require('../models/WorkflowModel');

router.get('/', async (req, res) => {
  try {
    const data = await Workflow.find().sort({ step: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', express.json(), async (req, res) => {
  const item = new Workflow({
    step: req.body.step,
    title: req.body.title,
    desc: req.body.desc
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
    const item = await Workflow.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (req.body.step != null) item.step = req.body.step;
    if (req.body.title != null) item.title = req.body.title;
    if (req.body.desc != null) item.desc = req.body.desc;

    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Workflow.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
