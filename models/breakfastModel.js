const mongoose = require ('mongoose');

const Joi = require("joi");

const breakfastSchema = new mongoose.Schema({
    breakfastName: { 
        type: String,
        required: true
    },
    breakfastDescription: {
        type: String,
        required: true
    },
    breakfastPrice: { 
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Breakfast', breakfastSchema)