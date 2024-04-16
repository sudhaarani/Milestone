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

router.get('/milestones/search/:timeline_id/:searchText', (req, res) => {  
  let {searchText,timeline_id} = req.params;
  console.log("searchText:",searchText)
  searchText=searchText.toLowerCase();
  db.query(`SELECT id as milestone_id,timeline_id, title as milestone_title, date as milestone_date, image1,image2,image3,image4 FROM milestones
   where (LOWER(title) LIKE $1) and timeline_id= $2;`, [`%${searchText}%`,timeline_id])
    .then(({ rows: users }) => {
      res.json(users);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});

//to search by date
router.get('/milestones/search/:timeline_id/:fromDate/:toDate', (req, res) => {  
  let {timeline_id,fromDate,toDate} = req.params;

  db.query(`SELECT id as milestone_id,timeline_id, title as milestone_title, date as milestone_date, image1,image2,image3,image4 FROM milestones
   where date BETWEEN $1 AND $2 and timeline_id= $3;`, [fromDate,toDate,timeline_id])
    .then(({ rows: milestones }) => {
      res.json(milestones);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});

module.exports = router;