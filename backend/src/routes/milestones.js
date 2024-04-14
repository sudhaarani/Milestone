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
  const { title,date,diary_entry,images,milestone_id,timeline_id } = req.body;

  db.query(`UPDATE milestones SET title =$1 , date=$2,diary_entry=$3, image1=$4,image2=$5,image3=$6,image4=$7
  WHERE id = $8 and timeline_id=$9 RETURNING *;`, [title, date, diary_entry, images[0],images[1],images[2],images[3],milestone_id ,timeline_id])
    .then(({ rows: milestones }) => {
      res.json(milestones);
    })
    .catch((error) => {
      console.error('Error updating timeline:', error);
      res.status(500).send('Server Error');
    });
});

router.delete('/milestones/delete/:timeline_id/:id', (req, res) => {  
  console.log("router delete");
  db.query(`DELETE FROM milestones WHERE id = $1 and timeline_id=$2;`,[req.params.id,req.params.timeline_id])
    .then(() => {
      console.log("Deleted milestone successfully");
      res.sendStatus(200);
    })
    .catch(error => {
      console.error("Error deleting milestone:",error);
      res.status(500).send('Server Error');
    });
});



module.exports = router;