const mongoose = require('mongoose');

const menuSchemaItem = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  taste:{
    type:String,
    enum:['spicy' , 'sweet' , 'sour']
  },
  is_drink:{
    type:Boolean,
    default:false
  },
  ingredients:{
    type:[String],
    default:[]
  },
  num_sales:{
    type:Number,
    default: 0
  }
});

const Menu = mongoose.model('Menu' , menuSchemaItem);
module.exports = Menu;