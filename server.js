const express = require('express');
const app = express();
const db = require('./config/db');
const bodyParser = require('body-parser');
const personRoutes = require('./rotues/personRoutes');
const MenuRoutes = require('./rotues/menuItemRoutes');
require('dotenv').config();

// middleware
app.use(bodyParser.json());
app.use('/person' , personRoutes);
app.use('/menu' , MenuRoutes);

const PORT = process.env.PORT || 4000


app.get('/' , (req , res)=>{
  res.send('Welcome to our Hotal..... How can i help you ');
});

app.listen(PORT, ()=>{
  console.log(`Server is Running port no ${PORT}`);
});