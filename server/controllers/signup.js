const User = require('../models/UserModel');
const { genJWT } = require('../utility/util');

const handleRegister = (req, res) => {
  const MINLENGTH = 6;
  const { email, password, name, confirmPassword } = req.body;
  if (!email || !name || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (confirmPassword !== password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  if (password.length < MINLENGTH) {
    return res.status(400).json({ message: `Password must be at least ${MINLENGTH}`});
  }
  return User.create({ name: name, password: password, email: email })
    .then((user) => {
      res
        .cookie('jwt', genJWT(user), {
          maxAge: 1210000000, // 14 days
          httpOnly: true,
        })
        .status(201)
        .json({ email: user.email, name: user.name });
    })
    .catch((err) =>
      res.status(500).json({ message: 'Email already exists - duplicate key' })
    );
};

module.exports = {
  handleRegister,
};
