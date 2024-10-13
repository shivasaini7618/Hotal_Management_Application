const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleware , generateToken} = require('../middleware/jwt');

// signUp routes
router.post('/signup' , async(req , res)=>{
  try{
    const Data = req.body;
    const newPerson = new Person(Data);
    const response = await newPerson.save();
    console.log('data saved');
    const payload = {
      id:response.id,
      username:response.username
    }
    console.log(payload);
    const token = generateToken(payload);
    console.log('Token is : ',token);

    res.status(200).json({ response:response ,token : token});
  }catch(err){
    console.log(err);
    res.send(500).json({message:"Internal server error;"});
  }; 
});

// login route
router.post('/signin' , async(req , res)=>{
  try{
    // extract uesername and password from the request body
    const {username , password} = req.body;
    // find the user by username 
    const user = await Person.findOne({username : username});

    // if user does not exist or password does not match , return error 
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({err: 'Invalid username or password'})
    }
    // generate token 
    const payload = {
      id : user.id,
      username: user.username
    }
    const token =generateToken(payload);

    // return token as response 
    res.json({token});

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal server error'});

  }
});

// Profile route 
router.get('/:profile' , jwtAuthMiddleware , async(req , res)=>{
  try{
    const userData = req.user;
    console.log("user data " , userData)

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json(user);

  }catch(error){
    console.error(err);
    res.status(500).json({error: 'Internal server error'});

  }
})



router.get('/',jwtAuthMiddleware , async(req , res)=>{
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