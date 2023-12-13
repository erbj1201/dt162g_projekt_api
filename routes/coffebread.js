const express = require('express');
const router = express.Router();
const Coffebread = require ('../models/coffebreadModel');

//Get all 
router.get('/', async (req, res) => {
    try{
        const coffebread = await Coffebread.find();
        res.json(coffebread);
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Get one by id 
router.get('/:id', async (req, res) =>{
    try{
        //Get id 
        const {id} = req.params;
        //find brekfast by id
        const coffebread = await Coffebread.findById(id);
        if (!coffebread) {
            return res.status(404).json({ message: `Could not find coffebread with id ${id}` });
          }
          res.status(200).json(coffebread);
    } catch (err) { 
        res.status(500).json({message: err.message});
    }
})
//Add one 
router.post('/', async (req, res) =>{
    const coffebread = new Coffebread({
        coffebreadName: req.body.coffebreadName,
        coffebreadDescription: req.body.coffebreadDescription,
        coffebreadCategory: req.body.coffebreadCategory,
        coffebreadPrice: req.body.coffebreadPrice
    })
    try{ 
        const newCoffebread = await coffebread.save()
        res.status(201).json(newCoffebread)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Update one by id 
router.put('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const coffebread = await Coffebread.findByIdAndUpdate(id, req.body);
    if (!coffebread) {
      return res.status(404).json({ message: `Could not find coffebread with id ${id}` });
    }
    const updatedCoffebread = await Coffebread.findById(id);
    res.status(201).json(updatedCoffebread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    })

//Delete one by id 
router.delete('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const coffebread= await Coffebread.findByIdAndDelete(id);
        if (!coffebread) {
            return res.status(404).json({ message: `Could not find coffebread with id ${id}` });
          }
          // Returnera meddelande om att kursen har raderats
          res.status(200).json({ message: `Coffebread with id ${id} deleted` });
    } catch(err){
    res.status(500).json({message: err.message})
    }
})


module.exports = router