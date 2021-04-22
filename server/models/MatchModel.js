const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const matchModel = new Schema({
  userIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});

module.exports = mongoose.model("Match", matchModel);
