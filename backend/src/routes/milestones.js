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

router.get('/milestones', (req, res) => {  
  db.query(`SELECT * FROM milestones order by id;`)
    .then(({ rows: milestones }) => {
      const updatedMilestonesObj = milestones.map(milestone => {
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


router.get('/milestones/search/:timeline_id/:searchText', (req, res) => {  
  let searchText = req.params.searchText;
  let timeline_id = req.params.timeline_id;
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

//for milestone-edit save form
//-------have to  implement deleting the previous image in the upload folder
router.post('/milestones/update', upload.array('images', 4), (req, res) => {
  const { title } = req.body;
  const { date } = req.body;
  const { diary_entry } = req.body;
  const { images } = req.body;

  const { milestone_id } = req.body;
  const { timeline_id } = req.body;
  let imagesArray = [];
  if (Array.isArray(images)) {
    // Handle array of files
    for (let i = 0; i < images.length; i++) {
      imagesArray.push(images[i]);
    }
  } else {
    // If images is a string, it means only one file is uploaded
    imagesArray.push(images);// = req.body.images;
    // Process single image
  }
  console.log("save: timeline id:", timeline_id);
  console.log("save: milestone_id :", milestone_id);
  console.log("save: title :", title);
  console.log("save: date:", date);
  console.log("save: diary_entry:", diary_entry);
  console.log("save: images:", images);
  console.log("save: imagesArray:", imagesArray);

  db.query(`UPDATE milestones SET title =$1 , date=$2,diary_entry=$3, image1=$4,image2=$5,image3=$6,image4=$7
  WHERE id = $8 and timeline_id=$9 RETURNING *;`, [title, date, diary_entry, imagesArray[0],imagesArray[1],imagesArray[2],imagesArray[3],milestone_id ,timeline_id])
    .then(({ rows: milestones }) => {
      
      res.json(milestones);
    })
    .catch((error) => {
      console.error('Error updating timeline:', error);
      res.status(500).send('Server Error');
    });
});


module.exports = router;