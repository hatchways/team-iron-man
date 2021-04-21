const express = require('express');
const router = express.Router();
const match = require('../controllers/match');
const verifyToken = require('../middlewares/authentication');

router.post('/newmatch', verifyToken, (req, res) => {
  match.addMatch(req, res);
});

module.exports = router;
