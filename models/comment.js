const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
