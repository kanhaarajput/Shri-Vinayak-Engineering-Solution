const express = require('express');
const router = express.Router();
const Video = require('../models/VideoModel');
const { upload } = require('../config/cloudinary');

// GET all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new video
router.post('/', upload.single('thumbnailUrl'), async (req, res) => {
  const video = new Video({
    title: req.body.title,
    youtubeUrl: req.body.youtubeUrl,
    thumbnailUrl: req.file ? req.file.path : req.body.thumbnailUrl,
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    await video.deleteOne();
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
