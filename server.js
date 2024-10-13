const express = require('express');
const app = express();
const db = require('./config/db');
const bodyParser = require('body-parser');
const personRoutes = require('./rotues/personRoutes');
const MenuRoutes = require('./rotues/menuItemRoutes');
require('dotenv').config();
const passport = require('./middleware/auth');

app.use(bodyParser.json());


const PORT = process.env.PORT || 4000

//middleware function
// const logRequest = (req , res , next)=>{
//   console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl} `);
//   next();
// }



// authentication use krne ke liye below line type likhte hai
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local' , {session:false});


app.use('/person' , personRoutes);
app.use('/menu' , MenuRoutes);


app.get('/', (req , res)=>{
  res.send('Welcome to our Hotal..... How can i help you ');
});

app.listen(PORT, ()=>{
  console.log(`Server is Running port no ${PORT}`);
});