////////////////////////////////////////////////////////
//            configuration & middleware              //
////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
router.use(express.json());
const db = require('../db/connection.js');



////////////////////////////////////////////////////////
//                      routes                        //
////////////////////////////////////////////////////////

router.get('/users', (req, res) => {  
  db.query(`SELECT * FROM users;`)
    .then(({ rows: users }) => {
      res.json(users);
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('Server Error');
    });
});


module.exports = router;