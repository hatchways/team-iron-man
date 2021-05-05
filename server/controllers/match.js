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

// Delete a match by given matchID
const deleteMatch = (req, res) => {
  const id = req.userID;
  const {matchID} = req.params;

  let status = new Array();

  Match.updateOne(
    {_id: matchID},
    { $pull: {'userIDs': id}} )
  .then(() => {
    status.push("Deleted player");
    Match.find(
      {_id: matchID},
    ).then((msg) => {

      if (msg[0].userIDs.length === 0){
        // delete match
        status.push("No players, delete match");
        Match.deleteOne({_id: matchID})
          .then(() => {
            status.push("Deleted match");
            res.status(200).json(JSON.stringify(status));
          })
          .catch((err) => {
            res.status(400).json({ message: 'Delete failed' });
            return;
          });
      }
      else {
        // keep match
        status.push("Player(s) is in match, keep match");
        res.status(200).json(JSON.stringify(status));
      }

    })
    .catch((err) => {
      res.status(400).json({ message: 'Match is not found' });
      return;
    });
  })
  .catch((err) => {
    res.status(400).json({ message: 'Delete failed' });
    return;
  });

}


module.exports = {
  addMatch,
  joinMatch,
  deleteMatch,
};
