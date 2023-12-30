// import express, router, model, and joi
const express = require("express");
const router = express.Router();
const menu = require("../models/menuModel");
const Joi = require("joi");
const auth = require("../auth/auth");

// Joi schema to validate data
const menuJoiSchema = Joi.object({
  name: Joi.string().min(5).required(),
  category: Joi.string().min(2).required(),
  description: Joi.string().min(5).required(),
  price: Joi.string().min(1).required(),
});

// Get all menu items
router.get("/", async (req, res) => {
  try {
    // Find all menu items
    const items = await menu.find();
    //If no menu items, return with message
    if (!items) {
      return res
        .status(404)
        .json({ message: `Could not find item with id ${id}` });
    }
    // Respond with JSON containing all menu items
    res.status(200).json(items);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

// Get one menu item by id
router.get("/:id", async (req, res) => {
  try {
    // Get id from request parameters
    const { id } = req.params;
    // Find menu item by id
    const item = await menu.findById(id);
    // If the menu item with the given id does not exist, respond with a 404 status and message
    if (!item) {
      return res
        .status(404)
        .json({ message: `Could not find item with id ${id}` });
    }
    // Respond with the menu item in JSON format
    res.status(200).json(item);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

//Authenticate everything below
router.use(auth);

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = menuJoiSchema.validate(req.body);
    // If validation fails, respond with a 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new menu item
    const newItem = await menu.create(req.body);
    // Respond with the newly created menu item in JSON format
    res.status(201).json(newItem);
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(400).json({ message: err.message });
  }
});
// Update a menu item by id using PUT
router.put("/:id", async (req, res) => {
  try {
    // Get id from request parameters
    const { id } = req.params;
    // Validate request body using Joi
    const { error } = menuJoiSchema.validate(req.body);
    // If validation fails, respond with a 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find and update the menu item by id using PUT
    const updatedItem = await menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // If the menu item with the given id does not exist, respond with a 404 status and message
    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: `Could not find item with id ${id}` });
    }

    // Fetch the updated menu item by id
    res.status(200).json(updatedItem);
  } catch (error) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: error.message });
  }
});

// Delete a menu item by id
router.delete("/:id", async (req, res) => {
  try {
    // Get id from request parameters
    const { id } = req.params;
    // Find and delete the menu item by id
    const deletedItem = await menu.findByIdAndDelete(id);
    // If the menu item with the given id does not exist, respond with a 404 status and message
    if (!deletedItem) {
      return res
        .status(404)
        .json({ message: `Could not find item with id ${id}` });
    }
    // Respond with a success message
    res.status(200).json({ message: `Item with id ${id} deleted` });
  } catch (err) {
    // If there is a server error, respond with an error message
    res.status(500).json({ message: err.message });
  }
});

// export router
module.exports = router;
