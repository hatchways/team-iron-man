const express = require('express');
const router = express.Router();
const match = require('../controllers/match');
const verifyToken = require('../middlewares/authentication');
const invite = require('../controllers/invite');

router.post('/create', verifyToken, match.addMatch);
router.post('/join/:matchID', verifyToken, match.joinMatch);
router.post('/delete/:matchID', verifyToken, match.deleteMatch);
router.post('/invite/:matchID', verifyToken, invite);

module.exports = router;
