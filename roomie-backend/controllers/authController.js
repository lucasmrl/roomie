const { promisify } = require('util'); //To make a function return a promisse
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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
    passwordChangedAt: req.body.passwordChangedAt,
  });

  //Create Token / Secret Key and Expire Time set in the config.env file
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'sucess',
    token, //Sending the token back to the client
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if e-mail and password was submited
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user eists && password is correct
  const user = await User.findOne({ email }).select('+password'); //+"name_of_field" to show passwords that we defined to not show up with "select: false" in the Schema

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect emmail or password', 401));
  }
  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in! Please log in.', 401));
  }

  // 2) Verification token (If someone manupulated the data or if the token is expired)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //Returns the payload, the IAT and EXP from token OR "JsonWebTokenError" if token is invalid

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('The user to this token does not exist.', 401));
  }

  // 4)Check if user changed password after the token was issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    //Since "freshUser" is a document, I can use the instance method on it ("changePasswordAfter");
    return next(
      new AppError(
        'The user recently changed password. Please log in again!',
        401
      )
    );
  }

  //Grant access to protected route
  req.user = freshUser; //Sending all the user info on the REQUEST to be used in the future
  next();
});
