const express = require('express');
const router = express.Router();
const Breakfast = require('../models/breakfastModel')



//Get all 
router.get('/', async (req, res) => {
try {
    const breakfast = await Breakfast.find()
    res.json(breakfast)
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
        const breakfast = await Breakfast.findById(id);
        if (!breakfast) {
            return res.status(404).json({ message: `Could not find breakfast with id ${id}` });
          }
          res.status(200).json(breakfast);
    } catch (err) { 
        res.status(500).json({message: err.message});
    }
})
//Add one 
router.post('/', async (req, res) =>{
    const breakfast = new Breakfast({
        breakfastName: req.body.breakfastName,
        breakfastDescription: req.body.breakfastDescription,
        breakfastPrice: req.body.breakfastPrice
    })
    try{ 
        const newBreakfast = await breakfast.save()
        res.status(201).json(newBreakfast)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//Update one by id 
router.put('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const breakfast = await Breakfast.findByIdAndUpdate(id, req.body);
    if (!breakfast) {
      return res.status(404).json({ message: `Could not find breakfast with id ${id}` });
    }
    const updatedBreakfast = await Breakfast.findById(id);
    res.status(201).json(updatedBreakfast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    })

//Delete one by id 
router.delete('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const breakfast= await Breakfast.findByIdAndDelete(id);
        if (!breakfast) {
            return res.status(404).json({ message: `Could not find breakfast with id ${id}` });
          }
          // Returnera meddelande om att kursen har raderats
          res.status(200).json({ message: `Breakfast with id ${id} deleted` });
    } catch(err){
    res.status(500).json({message: err.message})
    }
})




module.exports = router