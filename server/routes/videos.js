const express = require('express');
const router = express.Router();
const Video = require('../models/VideoModel');
const { upload } = require('../config/cloudinary');

// GET all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new video
router.post('/', upload.single('thumbnail'), async (req, res) => {
  const video = new Video({
    title: req.body.title,
    videoUrl: req.body.videoUrl,
    thumbnail: req.file ? req.file.path : req.body.thumbnail,
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a video
router.put('/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Cannot find video' });

    if (req.body.title != null) video.title = req.body.title;
    if (req.body.videoUrl != null) video.videoUrl = req.body.videoUrl;
    
    if (req.file) {
      video.thumbnail = req.file.path;
    } else if (req.body.thumbnail != null) {
      video.thumbnail = req.body.thumbnail;
    }

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Cannot find video' });
    
    await video.deleteOne();
    res.json({ message: 'Deleted Video' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
