const express = require('express');
const router = express.Router();
const Message = require('../models/message');  // Adjust path if needed

// Get all messages for a specific category
router.get('/:category', async (req, res) => {
  try {
    const messages = await Message.find({ category: req.params.category });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new message
router.post('/', async (req, res) => {
  const { username, avatar, category, message } = req.body;

  const newMessage = new Message({
    username,
    avatar,
    category,
    message,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
