const Match = require('./../models/MatchModel');

// add a match and return match ID
const addMatch = (req, res) => {
  const { id } = req.user;
  return Match.create({ userIDs: [id] })
    .then((match) => {
      res.status(200).json({ match: match._id });
    })
    .catch((err) => res.status(400).json({ message: 'Match not created' }));
};

module.exports = {
  addMatch,
};