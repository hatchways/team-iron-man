const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  },
});

UserSchema.pre('save', async function (next) {
  const SALT = 10;
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model('User', UserSchema);