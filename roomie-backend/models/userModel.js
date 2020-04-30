const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    validate: {
      // This only works on SAVE/CREATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  profilePicture: [String],
  myListings: [Number],
  about: {
    type: String,
  },
  age: {
    type: Number,
  },
  college: {
    type: String,
  },
  favoriteListings: {
    type: [String],
  },
});

//Encrypt Password using Document Middleware
// It will run before the data is persisted in the database
userSchema.pre('save', async function (next) {
  //"isModified" Method in all documents to check if that field was modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12 (the higher, the longer it takes)
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field/ We only need that to make sure the user typed the same password
  this.passwordConfirm = undefined;
  next();
});

//Creating the Model
const User = mongoose.model('User', userSchema);

module.exports = User;
