const User = require('../models/UserModel');
const { genJWT } = require('../utility/util');

const handleRegister = (req, res, bcrypt) => {
  const MINLENGTH = 6;
  const SALT = 10;
  const { email, password, name, confirmPassword } = req.body;
  if (!email || !name || !password || !confirmPassword) {
    return res.status(400).json('All fields must be filled');
  }
  if (confirmPassword !== password) {
    return res.status(400).json('Passwords do not match';
  }
  if (password.length < MINLENGTH) {
    return res.status(400).json(`Password must be at least ${MINLENGTH}`);
  }
  const hash = bcrypt.hashSync(password, SALT);
  return User.create({ name: name, password: hash, email: email })
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
      res.status(500).json('Email already exists - duplicate key')
    );
};

module.exports = {
  handleRegister,
};
