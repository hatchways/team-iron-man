const mongoose = require('mongoose')

// add a match and return match ID
function addMatch() {

  var Match = mongoose.model('matches');
  var match = new Match();
  var matchID = null;
  match.save(function(err, matchInfo) {
    if (err) throw err;
    console.log('Match saved, ID: ' + matchInfo.ID);
    matchID = matchInfo.ID;

  })

  return matchID;

}
