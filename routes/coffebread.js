//import express, model, Joi and router
const express = require("express");
const router = express.Router();
const Coffebread = require("../models/coffebreadModel");
const Joi = require("joi");

//Joi schema to validate data
const coffebreadJoiSchema = Joi.object({
  coffebreadName: Joi.string().min(5).required(),
  coffebreadDescription: Joi.string().min(5).required(),
  coffebreadCategory: Joi.string().min(5).required(),
  coffebreadPrice: Joi.string().min(1).required(),
});

//Get all
router.get("/", async (req, res) => {
  //find all
  try {
    const coffebread = await Coffebread.find();
    //response in json
    res.json(coffebread);
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
    const coffebread = await Coffebread.findById(id);
    //If choosen id not exist, message
    if (!coffebread) {
      return res
        .status(404)
        .json({ message: `Could not find coffebread with id ${id}` });
    } //Else return choosen id
    res.status(200).json(coffebread);
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Add one
router.post("/", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = coffebreadJoiSchema.validate(req.body);
    // If validation fails, respond 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } // Create a new instance
    const coffebread = new Coffebread({
      coffebreadName: req.body.coffebreadName,
      coffebreadDescription: req.body.coffebreadDescription,
      coffebreadCategory: req.body.coffebreadCategory,
      coffebreadPrice: req.body.coffebreadPrice,
    });
    //Save to db
    const newCoffebread = await coffebread.save();
    //Resond new data in json
    res.status(201).json(newCoffebread);
    //if server error, message
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Update one by id
router.put("/:id", async (req, res) => {
  try {
    // get id
    const { id } = req.params;
    // Validate request body using Joi
    const { error } = coffebreadJoiSchema.validate(req.body);
    // If validation fails, respond 400 status and details
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Find and update by id
    const coffebread = await Coffebread.findByIdAndUpdate(id, req.body);
    // If id doesn't exist, respond with a 404 status, message
    if (!coffebread) {
      return res
        .status(404)
        .json({ message: `Could not find coffebread with id ${id}` });
    }
    // Fetch the updated by id
    const updatedCoffebread = await Coffebread.findById(id);
    // Respond with the updated data in JSON format
    res.status(201).json(updatedCoffebread);
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
    const coffebread = await Coffebread.findByIdAndDelete(id);
    //If id does not exist, message
    if (!coffebread) {
      return res
        .status(404)
        .json({ message: `Could not find coffebread with id ${id}` });
    }
    // Return message, deleted
    res.status(200).json({ message: `Coffebread with id ${id} deleted` });
    //if server error, message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// export router
module.exports = router;
