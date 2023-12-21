//import mongoose
const mongoose = require("mongoose");
// Mongoose schema for model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});
// Exporting the Mongoose model
module.exports = mongoose.model("User", userSchema);