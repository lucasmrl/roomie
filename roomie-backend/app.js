const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const listingRouter = require('./routes/listingRouter');
const userRouter = require('./routes/userRouter');

// GLOBAL MIDDLEWARES
// {SECURITY} - Set security HTTP Headers | Best practice is to put it on top
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //HTTP Request logger
}

// {SECURITY} - Limit requests from the same IP
const limiter = rateLimit({
  max: 1500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
}); // 100 Requestes max from the same IP in 1 hour

app.use('/api', limiter);

// Body parse (reading data from body into req.body)
app.use(express.json({ limit: '10kb' }));

//Enable the server to read cookies
app.use(cookieParser());

// {SECURITY} - Data sanitization against NoSQL query injection
app.use(mongoSanitize()); //Remove "$" and others from inputs

// {SECURITY} - Data sanitization against XSS
app.use(xss()); //Can't insert html/javascript into our code

// {SECURITY} - Preventing Parameter Pollution
app.use(
  hpp({
    whitelist: ['rent'],
  })
); //To clear up the query string

// Serving static files
app.use(express.static(`${__dirname}/public`));

//ROUTES
app.use('/api/listings', listingRouter);
app.use('/api/users', userRouter);

//Handling routes not defined
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} doesn't exist on this server!❌`), 404); //if next() receives an argument, express knows that it is an error
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
