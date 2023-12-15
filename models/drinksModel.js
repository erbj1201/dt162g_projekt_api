//import mongoose
const mongoose = require("mongoose");
// Mongoose schema for model
const drinkSchema = new mongoose.Schema({
  drinkName: {
    type: String,
    required: true,
  },
  drinkCategory: {
    type: String,
    required: true,
  },
  drinkPrice: {
    type: String,
    required: true,
  },
});
// Exporting the Mongoose model
module.exports = mongoose.model("Drink", drinkSchema);
