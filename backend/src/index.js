// load .env data into process.env
require('dotenv').config();

const express = require("express"); // Import the express library
const app = express(); // Define our app as an instance of express
const port = process.env.DB_PORT ; 

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});