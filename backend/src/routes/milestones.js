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

router.post('/milestones', upload.array('images', 4), (req, res) => {
  const timeline_id = 1 //hardcoded for now
  const { title, date, diary_entry } = req.body;
  const image1 = req.files.length > 0 ? req.files[0].originalname : null;
  const image2 = req.files.length > 1 ? req.files[1].originalname : null;
  const image3 = req.files.length > 2 ? req.files[2].originalname : null;
  const image4 = req.files.length > 3 ? req.files[3].originalname : null;

  db.query(`
      INSERT INTO milestones (timeline_id, title, date, diary_entry, image1, image2, image3, image4)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
      [timeline_id, title, date, diary_entry, image1, image2, image3, image4]
    )
    .then(({ rows: milestones }) => {
      const updatedMilestonesObj = milestones.map(milestone => (
        { ...milestone,
          milestoneImageUrl: `/uploads/${milestone.image1}`
        }
      ));
      res.json(updatedMilestonesObj);
    })
    .catch((error) => {
      console.error('Error inserting milestone:', error);
      res.status(500).send('Server Error');
    });
});


router.get('/milestones', (req, res) => {
  db.query(`SELECT * FROM milestones`)
    .then(({ rows: milestones }) => {
      const updatedMilestonesObj = milestones.map(milestone => ({
        ...milestone,
        milestoneImage1Url: `/uploads/${milestone.image1}`,
        milestoneImage2Url: `/uploads/${milestone.image2}`,
        milestoneImage3Url: `/uploads/${milestone.image3}`,
        milestoneImage4Url: `/uploads/${milestone.image4}`
      }));
      res.json(updatedMilestonesObj);
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