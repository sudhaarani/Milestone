
const express = require('express');
const router = express.Router();
router.use(express.json());

const db = require("../db/connection.js");

router.get("/timelines", (request, response) => {  
  db.query(`SELECT * FROM timelines;`).then(({ rows: users }) => {
    response.json(users);
  }).catch(err => {
    console.error(err);
    response.status(500).send('Server Error');
  });
});


module.exports = router;