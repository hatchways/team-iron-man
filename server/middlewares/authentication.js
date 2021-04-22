const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt || '';
  try {
    if (!token) {
      return res.status(401).json('You need to Login');
    }
    const decrypt = await jwt.verify(token, process.env.SECRET_KEY);
    req.userID = decrypt.id;
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
