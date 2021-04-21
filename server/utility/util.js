const jwt = require('jsonwebtoken');

const genJWT = (user) => {
  const id = user._id;
  const expiresIn = '14d';

  const payload = {
    id,
    issuedAt: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });

  return signedToken;
};

module.exports = {
  genJWT,
};
