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
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
