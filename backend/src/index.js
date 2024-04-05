// load .env data into process.env
require('dotenv').config();

const express = require('express'); 
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8001; 

//////////////////////////////////////////////////
// serves static files from public directory 
const path = require('path'); 
app.use(express.static(path.join(__dirname, 'public'))); 
//////////////////////////////////////////////////

app.use(morgan('dev')); //to log HTTP requests to your application's console
app.use(express.urlencoded({ extended: true })); //parses the data and makes it available in the req.body object

const usersRoutes = require('./routes/users');
const milestonesRoutes = require('./routes/milestones');
const timelinesRoutes = require('./routes/timelines');

app.use('/api', usersRoutes);
app.use('/api', milestonesRoutes);
app.use('/api', timelinesRoutes);

app.listen(port, function (error) {
  if (error) {
    console.log(`Error starting server: ${error}`);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
