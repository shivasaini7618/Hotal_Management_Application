const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/' , async(req , res)=>{
  try{
    const Data = req.body;
    const newPerson = new Person(Data);
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json({ succuss: true , data:response , message:'data is stored successfully store'});
  }catch(err){
    console.log(err);
    res.send(500).json({message:"Internal server error;"});
  }; 
});

router.get('/' , async(req , res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched successfully');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json("Internal server error");
  };
});

router.get('/:workType' , async(req , res)=>{
  try{
  const workType = req.params.workType;
  if(workType=='chef' ||workType=='manager'||workType=='waiter'){
    const response =  await Person.find({work:workType});
    console.log('response fetched');
    res.status(200).json(response);
  }else{
    
    res.status(404).json({error:'Invalid work type'});
  }
  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error');
  }
});


router.put('/:id' ,async(req , res)=>{
  try{
    const personId = req.params.id;// extract the id from the url parameter

    const updataPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId  , updataPersonData , {
      new:true, // return the update document
      runValidators:true// run mongoose validation
    });

    if(!response){
      console.log('Person not found');
      return res.status(404).json({error: 'Person not fuond'});
    };
    console.log('data updated');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error')

  }
});

router.delete('/:id' ,async (req , res)=>{
  try{
    const personId = req.params.id
    const response = await Person.findByIdAndDelete(personId);
   
    if(!personId){
      console.log('Person not found');
      return res.status(404).json({error: 'Person not fuond'});
    }
    console.log('data deleted');
    res.status(200).json({message:'Person deleted successfully '});
  }catch(err){
    console.log(err);
    res.status(500).json('Internal server error')
  }
})
module.exports = router;