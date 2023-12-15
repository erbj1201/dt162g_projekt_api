//import mongoose
const mongoose = require("mongoose");
// Mongoose schema for model
const coffebreadSchema = new mongoose.Schema({
  coffebreadName: {
    type: String,
    required: true,
  },
  coffebreadDescription: {
    type: String,
    required: true,
  },
  coffebreadCategory: {
    type: String,
    required: true,
  },
  coffebreadPrice: {
    type: String,
    required: true,
  },
});
// Exporting the Mongoose model
module.exports = mongoose.model("Coffebread", coffebreadSchema);
