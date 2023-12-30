var express = require('express');
var router = express.Router();
const user = require("../models/userModel");

//Joi schema to validate data 

const userJoiSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().min(2).required(),
  password: Joi.string().min(5).required()
});


// Get all users
router.get("/", async (req, res) => {
  try {
    // Find all users
    const users = await menu.find();
    // Respond with JSON containing all users
    res.json(users);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

// Get one user by id
router.get("/:id", async (req, res) => {
  try {
    // Get id from request parameters
    const { id } = req.params;
    // Find menu item by id
    const user = await user.findById(id);
    // If the menu item with the given id does not exist, respond with a 404 status and message
    if (!user) {
      return res.status(404).json({ message: `Could not find user with id ${id}` });
    }
    // Respond with the menu item in JSON format
    res.status(200).json(user);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = userJoiSchema.validate(req.body);
    // If validation fails, respond with a 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new menu item
    const newUser = await user.create(req.body);
    // Respond with the newly created menu item in JSON format
    res.status(201).json(newUser);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
