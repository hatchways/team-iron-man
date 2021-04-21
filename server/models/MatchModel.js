
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const matchModel = new Schema({
  userIDs: {ID: String},
});

module.exports = matchModel;
