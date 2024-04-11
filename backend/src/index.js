////////////////////////////////////////////////////////
//            basic server configuration              //
////////////////////////////////////////////////////////

require('dotenv').config();
const express = require('express'); 
const app = express();
const port = process.env.PORT || 8001; 

const cors = require('cors'); // Import the cors module
app.use(cors()); // Use cors as middleware

////////////////////////////////////////////////////////
//                     middleware                     //
////////////////////////////////////////////////////////

const morgan = require('morgan');
app.use(morgan('dev'));
  // to log HTTP requests to your app's console

const path = require('path'); 
app.use(express.static(path.join(__dirname, 'public'))); 
  // to serve static files from public directory 

app.use(express.urlencoded({ extended: true }));
  // to parse data and make available in req.body



////////////////////////////////////////////////////////
//                      routing                       //
////////////////////////////////////////////////////////

const usersRoutes = require('./routes/users');
const milestonesRoutes = require('./routes/milestones');
const timelinesRoutes = require('./routes/timelines');
const loginRoutes = require('./routes/login'); // Import the login route

app.use('/api', usersRoutes);
app.use('/api', milestonesRoutes);
app.use('/api', timelinesRoutes);
app.use('/login', loginRoutes); // Use the login route with the express app



////////////////////////////////////////////////////////
//                  server listner                    //
////////////////////////////////////////////////////////

app.listen(port, function (error) {
  if (error) {
    console.log(`Error starting server: ${error}`);
  } else {
    console.log(`Server running on port ${port}`);
  }
});