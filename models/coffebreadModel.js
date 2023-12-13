const mongoose = require ('mongoose');

const Joi = require("joi");

const coffebreadSchema = new mongoose.Schema({
    coffebreadName: { 
        type: String,
        required: true
    },
    coffebreadDescription: {
        type: String,
        required: true
    },
    coffebreadCategory:{
        type: String,
        required: true
    },
    coffebreadPrice: { 
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Coffebread', coffebreadSchema)