const User = require('../models/UserModel');
const { genJWT, decodeJWT } = require('../utility/util');

const handleLogIn = async (req, res) => {
  const token = req.cookies.jwt || '';
  if (!token && req.body) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email or password is missing' });
    }
    return User.findOne({ email })
      .then((user) => {
        const isValid = user.validatePassword(password);
        if (isValid) {
          return res
            .cookie('jwt', genJWT(user), {
              maxAge: 1210000000, // 14 days
              httpOnly: true,
            })
            .status(200)
            .json({ email: user.email, name: user.name });
        } else {
          return res
            .status(400)
            .json({ message: 'Incorrect email or password' });
        }
      })
      .catch((error) =>
        res.status(400).json({ message: 'Incorrect email or password' })
      );
  } else if (token) {
    const id = decodeJWT(token);
    return User.findOne({ _id: id })
      .then((user) => {
        {
          return res.status(200).json({ email: user.email, name: user.name });
        }
      })
      .catch((err) => res.status(401).json({ message: 'You need to Login' }));
  } else {
    return res.status(401).json({ message: 'You need to Login' });
  }
};

module.exports = {
  handleLogIn,
};
