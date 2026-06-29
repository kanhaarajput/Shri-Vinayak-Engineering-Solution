const express = require('express');
const router = express.Router();
const Message = require('../models/MessageModel');

// GET all messages (for admin panel)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new message (from contact form)
router.post('/', async (req, res) => {
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    service: req.body.service,
    message: req.body.message,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Cannot find message' });
    
    await message.deleteOne();
    res.json({ message: 'Deleted Message' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
