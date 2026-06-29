const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMemberModel');
const { upload } = require('../config/cloudinary');

// GET all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new team member
router.post('/', upload.single('image'), async (req, res) => {
  const member = new TeamMember({
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
    image: req.file ? req.file.path : req.body.image,
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a team member
router.put('/:id', upload.single('image'), async (req, res) => {
  console.log('PUT /api/team/' + req.params.id);
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Cannot find member' });

    if (req.body.name != null) member.name = req.body.name;
    if (req.body.designation != null) member.designation = req.body.designation;
    if (req.body.about != null) member.about = req.body.about;
    if (req.file) {
      member.image = req.file.path;
    } else if (req.body.image != null) {
      member.image = req.body.image;
    }

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a team member
router.delete('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Cannot find member' });
    
    await member.deleteOne();
    res.json({ message: 'Deleted Team Member' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
