const Match = require('./../models/MatchModel');

// add a match and return match ID
const addMatch = (req, res) => {
  const id = req.userID;
  return Match.create({ userIDs: [id] })
    .then((match) => {
      res.status(200).json({ match: match._id });
    })
    .catch((err) => res.status(400).json({ message: 'Match not created' }));
};

// join a match by given matchID
const joinMatch = (req, res) => {
  const { matchID } = req.params;
  const id = req.userID;
  Match.findOneAndUpdate(
    {_id: matchID},
    {$push: {'userIDs': id}},
    {new: true}
  ).then(() => {
    res.status(200).json({status: 'Joining match'});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Match is not joined' });
  });

};


module.exports = {
  addMatch,
  joinMatch,
};
