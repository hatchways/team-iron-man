const express = require('express');
const mongoose = require('mongoose')
const Match = require('./../models/MatchModel');
const router = express.Router();

router.get('/match/:matchID', (req, res) => {
  const { matchID } = req.params;

  Match.findOneAndUpdate(
    {_id: matchID},
    {$push: {'userIDs': {/**** user's ObjectID here ****/}}},
    {new: true}
  ).then((meg) => {
      console.log(meg);
    });

    res.send(/**** waiting page ***/);

});

module.exports = router;
