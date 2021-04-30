const User = require('../models/UserModel');
const { decodeJWT } = require('../utility/util');

const authUser = (req, res) => {
  const token = req.cookies.jwt || '';
  if (!token) {
    return res.status(401).json({ message: 'You need to Login' });
  }
  const id = decodeJWT(token);
  return User.findOne({ _id: id })
    .then((user) => {
      {
        return res.status(200).json({ avatar: user.avatar, email: user.email, name: user.name });
      }
    })
    .catch((err) => res.status(401).json({ message: 'You need to Login' }));
};

module.exports = {
  authUser,
};
