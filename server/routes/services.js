const express = require('express');
const router = express.Router();
const Service = require('../models/ServiceModel');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new service
router.post('/', async (req, res) => {
  const service = new Service({
    title: req.body.title,
    desc: req.body.desc,
    iconName: req.body.iconName,
    image: req.body.image,
    color: req.body.color,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Cannot find service' });

    if (req.body.title != null) service.title = req.body.title;
    if (req.body.desc != null) service.desc = req.body.desc;
    if (req.body.iconName != null) service.iconName = req.body.iconName;
    if (req.body.image != null) service.image = req.body.image;
    if (req.body.color != null) service.color = req.body.color;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Cannot find service' });
    
    await service.deleteOne();
    res.json({ message: 'Deleted Service' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
