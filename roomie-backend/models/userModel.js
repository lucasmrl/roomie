const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Defining the Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
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
  profilePicture: String,
  about: {
    type: String,
  },
  age: {
    type: String,
  },
  college: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Virtual Populate to show all the listings from a User
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('myListings', {
  ref: 'Listing',
  foreignField: 'owner',
  localField: '_id',
});

/* MIDDLEWARES
 *
 */
// !!!!! THEY ONLY WORK WITH SAVE OR CREAT METHODS - NOT WITH FINDANDUPDATE, ETC.
// Encrypt Password using Document Middleware
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

//Change "passwordChangedAt" after user reseted his password
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //To ensure that the token was created after the password changed
  next();
});

// Remove the "inactive" users from showings
userSchema.pre(/^find/, function (next) {
  //query middleware // "this" poits to the current document
  this.find({ active: { $ne: false } }); //Showing all users that "active" is NOT EQUAL (NE) to false
  next();
});

/* INSTANCE METHODS
 *
 */
//Instance METHOD - AVAILABLE IN ALL DOCUMENTS OF THIS COLLETION
// A) This one compare the password provided in the login form and the one saved on the DB
userSchema.methods.correctPassword = async function (
  candidatePassword,
  usePassword
) {
  return await bcrypt.compare(candidatePassword, usePassword);
};

// B) This one will be used to verify if the password was changed after the token was generated to the user
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); //Convert the "passwordChangedAt" to the same format as the Token Created Date

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed/ So, good to go!
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//Creating the Model
const User = mongoose.model('User', userSchema);

module.exports = User;
