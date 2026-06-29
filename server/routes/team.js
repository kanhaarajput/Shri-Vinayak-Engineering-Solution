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

// Helper: wrap multer upload so Cloudinary errors are caught cleanly
function uploadMiddleware(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary upload error:', err);
      return res.status(500).json({ message: 'Image upload failed: ' + err.message });
    }
    next();
  });
}

// Helper function to build full URL for local uploads
const getFileUrl = (req, file) => {
  if (!file) return '';
  return file.path; // Cloudinary returns the URL in file.path
};

// POST a new team member
router.post('/', uploadMiddleware, async (req, res) => {
  console.log('POST /api/team - body:', req.body);
  console.log('POST /api/team - file:', req.file ? req.file.originalname : 'no file');
  try {
    const member = new TeamMember({
      name: req.body.name,
      designation: req.body.designation,
      about: req.body.about,
      image: req.file ? getFileUrl(req, req.file) : req.body.image,
    });

    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    console.error('POST /api/team ERROR:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a team member
router.put('/:id', uploadMiddleware, async (req, res) => {
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
      member.image = getFileUrl(req, req.file);
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
