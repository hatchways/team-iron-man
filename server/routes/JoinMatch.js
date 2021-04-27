const express = require('express');
const match = require('../controllers/match');
const verifyToken = require('../middlewares/authentication');
const router = express.Router();

router.post('/match/:matchID', verifyToken, match.joinMatch);

module.exports = router;
