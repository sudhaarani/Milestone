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

router.get('/milestones', (request, response) => {  
  db.query(`SELECT * FROM milestones;`)
    .then(({ rows: users }) => {
      response.json(users);
    })
    .catch(err => {
      console.error(err);
      response.status(500).send('Server Error');
    });
});


module.exports = router;