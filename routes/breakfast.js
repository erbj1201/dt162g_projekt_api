//import express, model, Joi and router
const express = require("express");
const router = express.Router();
const Breakfast = require("../models/breakfastModel");
const Joi = require("joi");

//Joi schema to validate data
const breakfastSchema = Joi.object({
  breakfastName: Joi.string().min(5).required(),
  breakfastDescription: Joi.string().min(5).required(),
  breakfastPrice: Joi.string().min(1).required(),
});

//Get all
router.get("/", async (req, res) => {
  //find all
  try {
    const breakfast = await Breakfast.find();
    //response in json
    res.json(breakfast);
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one by id
router.get("/:id", async (req, res) => {
  try {
    //Get id
    const { id } = req.params;
    //find by id
    const breakfast = await Breakfast.findById(id);
    //If choosen id not exist, message
    if (!breakfast) {
      return res
        .status(404)
        .json({ message: `Could not find breakfast with id ${id}` });
    } //Else return choosen id
    res.status(200).json(breakfast);
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Add one
router.post("/", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = breakfastSchema.validate(req.body);
    // If validation fails, respond 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Create a new instance
    const breakfast = new Breakfast({
      breakfastName: req.body.breakfastName,
      breakfastDescription: req.body.breakfastDescription,
      breakfastPrice: req.body.breakfastPrice,
    });
    //Save to db
    const newBreakfast = await breakfast.save();
    //Resond new data in json
    res.status(201).json(newBreakfast);
    //if server error, message
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one by id
router.put("/:id", async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    // Validate request body using Joi
    const { error } = breakfastSchema.validate(req.body);
    // If validation fails, respond 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Find and update by id
    const breakfast = await Breakfast.findByIdAndUpdate(id, req.body);
    // If id doesn't exist, respond with a 404 status and message
    if (!breakfast) {
      return res
        .status(404)
        .json({ message: `Could not find breakfast with id ${id}` });
    }
    // Fetch the updated by id
    const updatedBreakfast = await Breakfast.findById(id);
    // Respond with the updated data in JSON format
    res.status(201).json(updatedBreakfast);
    // If server error, message
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one by id
router.delete("/:id", async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //find and delete by id
    const breakfast = await Breakfast.findByIdAndDelete(id);
    //If it does not exist, message
    if (!breakfast) {
      return res
        .status(404)
        .json({ message: `Could not find breakfast with id ${id}` });
    }
    // Return message, deleted
    res.status(200).json({ message: `Breakfast with id ${id} deleted` });
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// export router
module.exports = router;
