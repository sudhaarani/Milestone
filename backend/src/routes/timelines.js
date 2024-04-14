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
    JOIN users ON timelines.user_id = users.id order by timelines.id;
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
  diary_entry,image1,image2,image3,image4 
  FROM timelines JOIN milestones ON milestones.timeline_id = timelines.id
  WHERE timelines.id = ${req.params.id} order by milestone_id;`)
    .then(({ rows: milestonesbytimeline }) => {
      const updatedMilestonesObj = milestonesbytimeline.map(milestone => {
        return  {...milestone,
          milestoneImageUrl: [`/uploads/${milestone.image1}`, `/uploads/${milestone.image2}`,
          `/uploads/${milestone.image3}`,`/uploads/${milestone.image4}`]
          }  
      });
      res.json(updatedMilestonesObj);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
});

//for timeline-edit save form
//-------have to  implement deleting the previous image in the upload folder
router.post('/timelines/update', upload.single('coverimage'), (req, res) => {
  const { title,description,coverimage,timeline_id } = req.body;
  const user_id = 1 //hardcoded for now

  db.query(`UPDATE timelines SET title =$1 , description=$2, image=$3
  WHERE id = $4 and user_id=$5 RETURNING *;`, [title, description, coverimage,timeline_id ,user_id])
    .then(({ rows: timelines }) => {
      res.json(timelines);
    })
    .catch((error) => {
      console.error('Error updating timeline:', error);
      res.status(500).send('Server Error');
    });
});

module.exports = router;