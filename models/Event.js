const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    societyCode: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Event', EventSchema);