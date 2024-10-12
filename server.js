const express = require('express');
const app = express();
const db = require('./config/db');
const bodyParser = require('body-parser');
const personRoutes = require('./rotues/personRoutes');
const MenuRoutes = require('./rotues/menuItemRoutes');

// middleware
app.use(bodyParser.json());
app.use('/person' , personRoutes);
app.use('/menu' , MenuRoutes);


app.get('/' , (req , res)=>{
  res.send('Welcome to our Hotal..... How can i help you ');
});

app.listen(3000 , ()=>{
  console.log('Server is Running port no 3000');
});