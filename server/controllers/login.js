const User = require('../models/UserModel');
const { genJWT } = require('../utility/util');

const handleLogIn = (req, res, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password is missing' });
  }

  return User.findOne({ email })
    .then((user) => {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        return res
          .cookie('jwt', genJWT(user), {
            maxAge: 1210000000, // 14 days
            httpOnly: true,
          })
          .status(200)
          .json({ email: user.email, name: user.name });
      } else {
        return res.status(400).json({ message: 'Incorrect email or password' });
      }
    })
    .catch((error) => res.status(400).json({ message: 'unable to get user' }));
};

module.exports = {
  handleLogIn,
};
