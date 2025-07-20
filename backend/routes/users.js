const express = require('express');
const db = require('../database');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error('Fetch error:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Create a new user
router.post('/', (req, res) => {
  const { name, email, password, role } = req.body;
  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;

  db.run(query, [name, email, password, role], function(err) {
    if (err) {
      console.error('Insert error:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'User created successfully', id: this.lastID });
    }
  });
});

module.exports = router;
