const express = require("express");
const app = express();
const morgan = require("morgan");

const listingRouter = require("./routes/listingRouter");
const userRouter = require("./routes/userRouter");

//MIDDLEWARES
if(process.env.NODE_ENV === 'development') {
  app.use(morgan("dev")); //HTTP Request logger
}
app.use(express.json()); //Makes the data from the body to be added to the "req" object

//ROUTES
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
