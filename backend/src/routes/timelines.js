////////////////////////////////////////////////////////
//            configuration & middleware              //
////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
router.use(express.json());
const db = require('../db/connection.js');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
// multer stores files uploaded in frontend to backend public folder
  


////////////////////////////////////////////////////////
//                      routes                        //
////////////////////////////////////////////////////////

router.post('/timelines', upload.single('coverimage'), (req, res) => {
  const { title } = req.body;
  const { description } = req.body;
  const image = req.file.filename;
  const user_id = 1 //hardcoded for now

  db.query(`
      INSERT INTO timelines (title, description, image, user_id)
      VALUES ($1, $2, $3, $4)`, 
      [title, description, image, user_id]
    )
    .then(({ rows: timelines }) => {
      const updatedTimelinesObj = timelines.map(timeline => (
        { ...timeline,
          timelineImageUrl: `/uploads/${timeline.image}`
        }
      ));
      res.json(updatedTimelinesObj);
    })
    .catch((error) => {
      console.error('Error inserting timeline:', error);
      res.status(500).send('Server Error');
    });
});


router.get('/timelines', (req, res) => {
  db.query(`
    SELECT timelines.*, users.username
    FROM timelines
    JOIN users ON timelines.user_id = users.id;
  `)
    .then(({ rows: timelines }) => {
      const updatedTimelinesObj = timelines.map(timeline => ({
        ...timeline,
        timelineImageUrl: `/uploads/${timeline.image}`
      }));
      res.json(updatedTimelinesObj);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});

router.get('/timelines/milestones/:id', (req, res) => {  
  db.query(`SELECT timelines.*,milestones.id as milestone_id,milestones.title as milestone_title, milestones.date as milestone_date,
  image1,image2,image3,image4 
  FROM timelines JOIN milestones ON milestones.timeline_id = timelines.id
  WHERE timelines.id = ${req.params.id};`)
    .then(({ rows: users }) => {
      res.json(users);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});
// 


module.exports = router;