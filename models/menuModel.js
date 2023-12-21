//import mongoose
const mongoose = require("mongoose");
// Mongoose schema for model
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});
// Exporting the Mongoose model
module.exports = mongoose.model("Menu", menuSchema);
