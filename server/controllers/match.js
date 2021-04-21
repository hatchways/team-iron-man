const matchModel = require("./../model/MatchModel");
const mongoose = require('mongoose');

// add a match and return match ID
function addMatch() {

  const Match = mongoose.model("Match", matchModel);
  const match = new Match({
    userIDs: {ID: null},
  });
  let matchID = "nothing";
  match.save(function(err, matchInfo) {
    if (err) {throw err;}
    else {
      matchID = matchInfo._id.toString();
      console.log('Match saved, ID: ' + matchInfo._id);

    }

  });
  return matchID;

}

module.exports = addMatch;
