const router = require('express').Router();
const Announcement = require('../models/Announcement');

// Create
router.post('/', async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    const savedAnnouncement = await newAnnouncement.save();
    res.status(200).json(savedAnnouncement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id, { $set: req.body }, { new: true }
    );
    res.status(200).json(updatedAnnouncement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json("Announcement deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Single
router.get('/find/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ _id: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
