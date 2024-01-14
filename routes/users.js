//Import
const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Joi schema to validate data
const userJoiSchema = Joi.object({
  email: Joi.string().min(10).email().required(),
  password: Joi.string().min(5).required(),
});

// Get all users
router.get("/", async (req, res) => {
  try {
    // Find all
    const foundUsers = await userModel.find();
    // If no users, message
    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: `Could not find any users` });
    }
    // Return users in json
    res.status(200).json(foundUsers);
  } catch (err) {
    // If error,  error message
    res.status(500).json({ message: err.message });
  }
});

// Get one user by id
router.get("/:id", async (req, res) => {
  try {
    // Get id
    const { id } = req.params;
    // Find user by id
    const userById = await userModel.findById(id);

    // If user does not exist, 404 status message
    if (!userById) {
      return res
        .status(404)
        .json({ message: `Could not find user with id ${id}` });
    }

    // Send back user in JSON
    res.status(200).json(userById);
  } catch (err) {
    // If server error,  error message
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // if user exists, send back message
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: `User with ${email} already exists` });
    }

    // Validate using Joi
    const { error } = userJoiSchema.validate(req.body);

    // validation fails, 400 status, details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
    });

    // send back userinfo
    res.status(201).json(newUser);
  } catch (err) {
    // If server error, error message
    res.status(500).json({ message: err.message });
  }
});
//export
module.exports = router;
