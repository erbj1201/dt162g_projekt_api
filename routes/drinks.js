const express = require('express');
const router = express.Router();
const Drink = require('../models/drinksModel');



//Get all 
router.get('/', async (req, res) => {
    try {
        const drink = await Drink.find();
        res.json(drink);
    } catch(err){
        res.status(500).json({message: err.message})
    }
    })
//Get one by id 
router.get('/:id', async (req, res) =>{
    try{
        //Get id 
        const {id} = req.params;
        //find brekfast by id
        const drink = await Drink.findById(id);
        if (!drink) {
            return res.status(404).json({ message: `Could not find drink with id ${id}` });
          }
          res.status(200).json(drink);
    } catch (err) { 
        res.status(500).json({message: err.message});
    }
})
//Add one 
router.post('/', async (req, res) =>{
    const drink = new Drink({
        drinkName: req.body.drinkName,
        drinkCategory: req.body.drinkCategory,
        drinkPrice: req.body.drinkPrice
    })
    try{ 
        const newDrink = await drink.save()
        res.status(201).json(newDrink)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//Update one by id 
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const drink = await Drink.findByIdAndUpdate(id, req.body);
  
      if (!drink) {
        return res.status(404).json({ message: `Could not find drink with id ${id}` });
      }
      const updatedDrink = await Drink.findById(id);
      res.status(201).json(updatedDrink);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Delete one by id 
router.delete('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const drink= await Drink.findByIdAndDelete(id);
        if (!drink) {
            return res.status(404).json({ message: `Could not find drink with id ${id}` });
          }
          // Returnera meddelande om att kursen har raderats
          res.status(200).json({ message: `Drink with id ${id} deleted` });
    } catch(err){
    res.status(500).json({message: err.message})
    }
})

module.exports = router