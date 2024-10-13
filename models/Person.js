const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true,
  },
  work:{
    type:String,
    enum: ['manager' , 'chef' , 'waiter'],
    required:true
  },
  mobile:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  salary:{
    type:Number,
    default:20000
  },
  username:{
    type:String,
    required:true,

  },
  password:{
    type:String,
    required:true,
  }

});

personSchema.pre('save' , async function (next){
  const person = this;
  // hash the password only if it has been modified (or is new)
  if(!person.isModified('password')) return next();
  try{
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hashed password 
    const hashedPassword = await bcrypt.hash(person.password , salt);

    person.password = hashedPassword;
    next();
  }catch(err){
    return next(err);
  }
});

personSchema.methods.comparePassword = async function(candidatePassword){
  try{
    const isMatch = await bcrypt.compare(candidatePassword , this.password);
    return isMatch;
  }catch(err){
    throw err;
  }
}

const Person = mongoose.model('Person' , personSchema);
// module.exports = ('Person' , personSchema);
module.exports = Person;