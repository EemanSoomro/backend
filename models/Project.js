const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    objective: {
        type: String,
        default: ""
    },
    application: {
        type: String,
        default: ""
    },
    technologies: {
        type: String,
        default: ""
    },
    abstract: {
        type: String,
        default: ""
    },
    supervisor: {
        type: String,
        default: ""
    },
    domain: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        default: ""
    },
    year: {
        type: Number,
        required: true // Making it required if it's essential to have a year
    },
    status: {
        type: String,
        default: "In Progress", // You could also default it to "completed", "in progress", or similar
        enum: ["In Progress", "completed", "planned", "canceled"] // Restricting possible values for better validation
    },
    university: { // New field for university
        type: String,
        required: true // Assuming university is required
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
