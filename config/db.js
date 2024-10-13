const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL =process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;
//set up mongodb Connection
mongoose.connect(mongoURL);

const db = mongoose.connection;
// event listener
db.on('connected' , ()=>{
  console.log('MongoDB server connected successfully');
});

db.on('error' , (err)=>{
  console.log('Internal Mongodb server error' , err);
});

db.on('disconnected' , ()=>{
  console.log('MongoDb server disconnected');
});

module.exports = db;