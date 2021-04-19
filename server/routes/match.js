const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  dateTime: String,
});
const match = mongoose.model('matches', matchSchema);
module.exports = match;


// add a match and return match ID
function addMatch() {

  var Match = mongoose.model('Task');
  var match = new Match();
  match.dateTime = new Date().toLocaleString();
  var matchID = null;
  match.save(function(err, matchInfo) {
    if (err) throw err;
    console.log('Match saved, ID: ' + matchInfo.ID);
    matchID = matchInfo.ID;

  })

  return matchID;

}
