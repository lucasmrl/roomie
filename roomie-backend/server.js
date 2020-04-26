const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connection successful!🔑');
  })
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}❌`);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...🚀`);
});
