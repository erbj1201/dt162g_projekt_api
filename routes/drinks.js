//import express, router, model and joi
const express = require("express");
const router = express.Router();
const Drink = require("../models/drinksModel");
const Joi = require("joi");

// Joi schema to validate data
const drinkJoiSchema = Joi.object({
  drinkName: Joi.string().min(5).required(),
  drinkCategory: Joi.string().min(5).required(),
  drinkPrice: Joi.string().min(1).required(),
});
//Get all
router.get("/", async (req, res) => {
  //find all
  try {
    const drink = await Drink.find();
    //response in json
    res.json(drink);
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
    const drink = await Drink.findById(id);
    //If choosen id not exist, message
    if (!drink) {
      return res
        .status(404)
        .json({ message: `Could not find drink with id ${id}` });
    } //Else return choosen id
    res.status(200).json(drink);
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Add one
router.post("/", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = drinkJoiSchema.validate(req.body);
    // If validation fails, respond 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Create a new instance
    const drink = new Drink({
      drinkName: req.body.drinkName,
      drinkCategory: req.body.drinkCategory,
      drinkPrice: req.body.drinkPrice,
    });
    //Save to db
    const newDrink = await drink.save();
    //Resond new data in json
    res.status(201).json(newDrink);
  } catch (err) {
    //if server error, message
    res.status(400).json({ message: err.message });
  }
});
//Update one by id
router.put("/:id", async (req, res) => {
  try {
    // get id
    const { id } = req.params;
    // Validate request body using Joi
    const { error } = drinkJoiSchema.validate(req.body);
    // If validation fails, respond 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Find and update by id
    const drink = await Drink.findByIdAndUpdate(id, req.body);
    // If id doesn't exist, respond with a 404 status, message
    if (!drink) {
      return res
        .status(404)
        .json({ message: `Could not find drink with id ${id}` });
    }
    // Fetch the updated by id
    const updatedDrink = await Drink.findById(id);
    // Respond with the updated drink in JSON format
    res.status(201).json(updatedDrink);
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
    const drink = await Drink.findByIdAndDelete(id);
    //If id does not exist, message
    if (!drink) {
      return res
        .status(404)
        .json({ message: `Could not find drink with id ${id}` });
    }
    // Return message, deleted
    res.status(200).json({ message: `Drink with id ${id} deleted` });
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// export router
module.exports = router;
