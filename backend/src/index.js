const express  = require("express"); // Import the express library
const app = express(); // Define our app as an instance of express
const port = 8000; // Define our base URL as http:\\localhost:3000

app.listen(port, function () {
  console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
});