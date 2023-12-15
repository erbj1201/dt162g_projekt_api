//import mongoose
const mongoose = require("mongoose");
// Mongoose schema for model
const breakfastSchema = new mongoose.Schema({
  breakfastName: {
    type: String,
    required: true,
  },
  breakfastDescription: {
    type: String,
    required: true,
  },
  breakfastPrice: {
    type: String,
    required: true,
  },
});
// Exporting the Mongoose model
module.exports = mongoose.model("Breakfast", breakfastSchema);
