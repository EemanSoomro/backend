const mongoose = require('mongoose');
const moment = require('moment');

const AnnouncementSchema = new mongoose.Schema({
  type: { type: String, required: true },
  subject: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
}, { timestamps: true });

module.exports = mongoose.model("Announcement", AnnouncementSchema);
