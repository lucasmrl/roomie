const mongoose = require('mongoose');
const validator = require('validator');

//Defining the Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true, //To remove space at the beginning or/and end of the string
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true, //Converts string to lowercase
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
  profilePicture: [String],
  myListings: [Number],
  about: String,
  age: Number,
  college: String,
  favoriteListings: {
    type: [String],
  },
});

//Creating the Model
const User = mongoose.model('User', userSchema);

module.exports = User;
