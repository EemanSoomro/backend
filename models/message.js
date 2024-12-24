const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String },
  category: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
