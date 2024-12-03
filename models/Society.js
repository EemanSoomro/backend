const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    picture: String,
    tagline: String, // optional field for additional description
    events: [{ name: String, details: String, date: String }], // array of events
    roles: [String], // array of roles
    background: String, // optional background image or data specific to the detail page
    code: String, // unique identifier or code for the society
}, {
    timestamps: true, // adds createdAt and updatedAt fields automatically
});

const Society = mongoose.model('Society', SocietySchema);

module.exports = Society;
