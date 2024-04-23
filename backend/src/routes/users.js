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
      res.status(500).send('Server Error');
    });
});

router.get('/followings', (req, res) => {  
  db.query(`SELECT * FROM followings;`)
    .then(({ rows: followings }) => {
      res.json(followings);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});


router.get('/followings/:userid', (req, res) => {  
  const user1Id = req.params.userid;
  db.query(`SELECT * FROM followings WHERE user1_id = $1`, [user1Id])
    .then(({ rows: followings }) => {
      res.json(followings);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});


router.post('/followings/:userid', (req, res) => {
  const user1Id = req.body.user1Id; 
  const user2Id = req.body.user2Id; 

  db.query(`
    INSERT INTO followings (user1_id, user2_id)
    VALUES ($1, $2)
  `, [user1Id, user2Id])
  .then(() => {
    res.status(201).send('Following added successfully');
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Server Error');
  });
});


router.delete('/followings/:userid', (req, res) => {
  const user1Id = req.body.user1Id;
  const user2Id = req.body.user2Id; 

  db.query(`
    DELETE FROM followings
    WHERE user1_id = $1 AND user2_id = $2
  `, [user1Id, user2Id])
  .then(() => {
    res.status(204).send(); // No content sent back since the favorite is removed
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Server Error');
  });
});





module.exports = router;