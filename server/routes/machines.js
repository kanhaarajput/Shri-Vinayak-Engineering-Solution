const express = require('express');
const router = express.Router();
const Machine = require('../models/MachineModel');
const { upload } = require('../config/cloudinary');

// GET all machines
router.get('/', async (req, res) => {
  try {
    // Sort by order by default
    const machines = await Machine.find().sort({ order: 1 });
    res.json(machines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new machine
router.post('/', upload.single('image'), async (req, res) => {
  const machine = new Machine({
    name: req.body.name,
    description: req.body.description,
    launchDate: req.body.launchDate,
    status: req.body.status,
    order: req.body.order,
    isHidden: req.body.isHidden === 'true' || req.body.isHidden === true,
    isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
    image: req.file ? req.file.path : req.body.image,
  });

  try {
    const newMachine = await machine.save();
    res.status(201).json(newMachine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a machine
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: 'Cannot find machine' });

    if (req.body.name != null) machine.name = req.body.name;
    if (req.body.description != null) machine.description = req.body.description;
    if (req.body.launchDate != null) machine.launchDate = req.body.launchDate;
    if (req.body.status != null) machine.status = req.body.status;
    if (req.body.order != null) machine.order = req.body.order;
    
    if (req.body.isHidden != null) {
      machine.isHidden = req.body.isHidden === 'true' || req.body.isHidden === true;
    }
    if (req.body.isFeatured != null) {
      machine.isFeatured = req.body.isFeatured === 'true' || req.body.isFeatured === true;
    }

    if (req.file) {
      machine.image = req.file.path;
    } else if (req.body.image !== undefined) {
      machine.image = req.body.image;
    }

    const updatedMachine = await machine.save();
    res.json(updatedMachine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a machine
router.delete('/:id', async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: 'Cannot find machine' });
    
    await machine.deleteOne();
    res.json({ message: 'Deleted Machine' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
