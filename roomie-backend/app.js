const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.status(200).send("Server running! 🏝");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
