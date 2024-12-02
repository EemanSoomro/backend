const mongoose = require('mongoose');

// Define the schema for Society
const SocietySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures society name is unique
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String, // Image path for society's main picture
      required: true,
    },
    background: {
      type: String, // Image path for society's background picture
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true, // Ensures society code is unique
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
module.exports = mongoose.model('Society', SocietySchema);
