const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const listingRouter = require('./routes/listingRouter');
const userRouter = require('./routes/userRouter');

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //HTTP Request logger
}

// -- Rate limiting
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
}); // 100 Requestes max from the same IP in 1 hour

app.use('/api', limiter);

app.use(express.json()); //Makes the data from the body to be added to the "req" object

//ROUTES
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/users', userRouter);

//Handling routes not defined
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} doesn't exist on this server!❌`), 404); //if next() receives an argument, express knows that it is an error
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
