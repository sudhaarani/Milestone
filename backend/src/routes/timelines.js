
const express = require('express');
const router = express.Router();
router.use(express.json());

const db = require("../db/connection.js");

router.get('/timelines', (req, res) => {  
  db.query(`SELECT * FROM timelines;`)
    .then(({ rows: timelines }) => {
      const updatedTimelinesObj = timelines.map(timeline => (
        { ...timeline,
          timelineImageUrl: `/uploads/${timeline.image}`
        }
      ));
      res.json(updatedTimelinesObj);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});


module.exports = router;