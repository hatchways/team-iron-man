const express = require('express');
const router = express.Router();
const match = require('../controllers/match');
const verifyToken = require('../middlewares/authentication');

router.post('/newmatch', verifyToken, match.addMatch);

module.exports = router;
