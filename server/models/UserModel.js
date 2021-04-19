const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required!'],
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'The email is required!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is required!'],
    minlength: 6,
  },
});

module.exports = mongoose.model('User', UserSchema);
