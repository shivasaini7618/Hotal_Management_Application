const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.post('/' , async(req , res)=>{
  try{
    const data = req.body;
    const newMenuItem = new Menu(data);
    const response = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error');
  }
});

router.get('/' , async(req , res)=>{
  try{
    const data = await Menu.find();
    console.log('Data fetched successfully');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error');
  }
});

router.get('/:tasteType' , async(req , res)=>{
  try{
    const tasteType = req.params.tasteType;
    if(tasteType=='sweet'|| tasteType=='sour'||tasteType=='spicy'){
      const response = await Menu.find({taste:tasteType});
      console.log('response fetched');
      res.status(200).json(response);

    }else{
      res.status(404).json('Taste is not matched');
    }

  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error');
  }
});

router.put('/:id' , async(req , res)=>{
  try{
    const menuId = req.params.id;
    const updateMenuItem = req.body;
    const response = await Menu.findByIdAndUpdate(menuId ,updateMenuItem ,{
      new:true,
      runValidators:true
    });
    if(!menuId){
      console.log('Menu item not found');
      res.status(404).json({message:'Menu item not found'});
    };
    console.log('Item updated successfully ');
    res.status(200).json(response);


  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error');
  }
});

router.delete('/:id' ,async(req , res)=>{
  try{
    const menuId = req.params.id;
    const response =  await Menu.findByIdAndDelete(menuId);
    if(!menuId){
      console.log('menu not found');
      res.send(404).json({message:'Menu not fouond'});
    }
    console.log('Item deleted successfully ');
    res.status(200).json({message:'Item deleted successfully '});

  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error');
  }
})

module.exports = router;