const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const matchModel = new Schema({
  userIDs: {String: ID},
});

module.exports = matchModel;
