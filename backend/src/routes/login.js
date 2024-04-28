const express = require('express');
const router = express.Router();
router.use(express.json());
const db = require('../db/connection.js');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      // Username does not exist
      res.status(401).send('Username does not exist');
    } else {
      const passwordResult = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
      if (passwordResult.rows.length === 0) {
        // Password is incorrect
        res.status(401).send('Password is incorrect');
      } else {
        // User is authenticated
        const user = passwordResult.rows[0];
        res.status(200).json({ id: user.id, username: user.username }); // Send back user's ID and username
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;