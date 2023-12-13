const Joi = require('joi');

const breakfastSchema = Joi.object({
    breakfastName: Joi.string().min(5).required(),
    breakfastDescription: Joi.string().min(5).required(),
    breakfastPrice: Joi.string().min(1).required()
});

module.exports = { 
    validateBreakfast: (data) => breakfastSchema.validate(data),
};

