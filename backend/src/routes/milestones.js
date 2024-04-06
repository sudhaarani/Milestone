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

router.get('/milestones', (req, res) => {  
  db.query(`SELECT * FROM milestones;`)
    .then(({ rows: users }) => {
      res.json(users);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});


module.exports = router;