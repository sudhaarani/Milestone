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
router.post('/timelines/update', upload.single('image'), (req, res) => {
  const { title, description, timeline_id } = req.body;
  let image;
  if (req.file) { 
    image=req.file.filename;
  }
  
  const user_id = 1 //hardcoded for now
 // console.log("coverimage::in req:", image);

  const queryParams = [];
  let queryText = `UPDATE timelines SET`;

  const update = {
    title,
    description,
    image,
  };
  Object.entries(update).forEach(([key, value], index) => {
    if (value) {
      queryText += ` ${key} = $${queryParams.length + 1},`;
      queryParams.push(value);
    }
  });
  
  // Remove the trailing comma if any additional columns were added to the query
  if (queryText.endsWith(',')) {
    queryText = queryText.slice(0, -1);
  }
  
  queryText += ` WHERE id = $${queryParams.length + 1} AND user_id = $${queryParams.length + 2} RETURNING *;`;
  queryParams.push(timeline_id, user_id);
  
  db.query(queryText, queryParams)
    .then(({ rows: timelines }) => {
      res.json(timelines);
    })
    .catch((error) => {
      console.error('Error updating timeline:', error);
      res.status(500).send('Server Error');
    });
});

router.delete('/timelines/delete/:id', (req, res) => {  
  const user_id = 4 //hardcoded for now
  console.log("router post")
  db.query(`DELETE FROM timelines WHERE id = $1 and user_id=$2;`,[req.params.id,user_id])
    .then(() => {
      console.log("Deleted timeline successfully");
      res.sendStatus(200);
    })
    .catch(error => {
      console.error("Error deleting timeline:",error);
      res.status(500).send('Server Error');
    });
});

module.exports = router;