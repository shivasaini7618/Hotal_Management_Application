const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/mydatabase';
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