//Import
const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Joi schema to validate data
const userJoiSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().min(10).email().required(),
  password: Joi.string().min(5).required()
});

// Get all users
router.get("/", async (req, res) => {
  try {
    // Find all users
    const foundUsers = await userModel.find(); // Change variable name to 'foundUsers'
    
    // If no users return with message
    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: `Could not find any users` });
    }
    
    // Respond with JSON containing all users
    res.status(200).json(foundUsers);
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
    // Find user by id
    const userById = await userModel.findById(id);
    
    // If the user with the given id does not exist, respond with a 404 status and message
    if (!userById) {
      return res.status(404).json({ message: `Could not find user with id ${id}` });
    }
    
    // Respond with the user in JSON format
    res.status(200).json(userById);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ message: `User with ${email} already exists` });
    }

    // Validate request body using Joi
    const { error } = userJoiSchema.validate(req.body);

    // If validation fails, respond with a 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

   // Hash the password
   const hashedPassword = await bcrypt.hash(password, 10);

   // Create a new user with the hashed password
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    // Respond with the newly created user in JSON format
    res.status(201).json(newUser);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;