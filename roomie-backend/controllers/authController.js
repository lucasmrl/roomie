const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    profilePicture: req.body.profilePicture,
    favoriteListings: req.body.favoriteListings,
    college: req.body.college,
    age: req.body.age,
    about: req.body.about,
    myListings: req.body.myListings,
  });

  //Create Token / Secret Key and Expire Time set in the config.env file
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'sucess',
    token, //Sending the token back to the client
    data: {
      user: newUser,
    },
  });
});
