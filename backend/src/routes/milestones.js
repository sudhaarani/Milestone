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
        let milestoneImageUrl = []
        for (let i = 1; i <= 4; i++) { 
          let fileName = milestone['image' + `${i}`]
          if (fileName) { 
            milestoneImageUrl.push(`/uploads/${fileName}`)
          }   
        }

        return  {...milestone,
          milestoneImageUrl: milestoneImageUrl
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
  const { title, date, diary_entry, milestone_id, timeline_id } = req.body;
  
  //let image1, image2, image3, image4;
  console.log("req.files:: imageCount::", req.files);
  //let image = [];
   
  const image1 = req.files.length > 0 ? req.files[0].originalname : null;
  const image2 = req.files.length > 1 ? req.files[1].originalname : null;
  const image3 = req.files.length > 2 ? req.files[2].originalname : null;
  const image4 = req.files.length > 3 ? req.files[3].originalname : null;
  
    // let startCount;
  // changingImageCount = req.files.length;
  // startCount = imageCount - changingImageCount
  // if (startCount < 0) {
  //   startCount = 0
  // }
  // console.log("length ::startCount:", length, " ", startCount);
  
  // while (startCount < 4 && changingImageCount > 0) {
  //   console.log("inside 1:");
  //   image.push(req.files[changingImageCount - 1].originalname);
  //   startCount += 1;
  //   changingImageCount -= 1;
  // }

  // while (startCount < 4) {
  //   image.push(null)
  // }
  console.log("title:", title);
  console.log("date:", date);
  console.log("diary_entry:", diary_entry);
  console.log("image1:", image1);
  console.log("image2:", image2);
  console.log("image3:",image3);
  console.log("image4:", image4);
  
  const queryParams = [];
  let queryText = `UPDATE milestones SET`;

  const propertiesToUpdate = {
    title,
    date,
    diary_entry,
    image1,
    image2,
    image3,
    image4
  };
  
  // Iterate over the properties and dynamically construct the query
  Object.entries(propertiesToUpdate).forEach(([key, value], index) => {
    if (value) {
      queryText += ` ${key} = $${queryParams.length + 1},`;
      queryParams.push(value);
    }
  });
  
  // Remove the trailing comma if any additional columns were added to the query
  if (queryText.endsWith(',')) {
    queryText = queryText.slice(0, -1);
  }
  
  queryText += ` WHERE id = $${queryParams.length + 1} AND timeline_id = $${queryParams.length + 2} RETURNING *;`;
  queryParams.push(milestone_id,timeline_id);
  console.log("queryText::", queryText);
  console.log("queryParams::", queryParams);
  
  db.query(queryText, queryParams)
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