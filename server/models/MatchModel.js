
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const matchModel = new Schema({
  userIDs: [String],
});

module.exports = mongoose.model("Match", matchModel);
