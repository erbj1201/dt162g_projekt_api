const mongoose = require ('mongoose');

const Joi = require("joi");

const drinkSchema = new mongoose.Schema({
    drinkName: { 
        type: String,
        required: true
    },
    drinkCategory:{
        type: String,
        required: true
    },
    drinkPrice: { 
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Drink', drinkSchema)