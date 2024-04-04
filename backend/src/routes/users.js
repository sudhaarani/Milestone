
const express = require('express');
const router = express.Router();
router.use(express.json());

const db = require("../db/connection.js");

router.get("/users", (request, response) => {  
  db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
    response.json(users);
  }).catch(err => {
    console.error(err);
    response.status(500).send('Server Error');
  });
});


module.exports = router;