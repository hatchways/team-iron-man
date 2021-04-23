const { decodeJWT } = require('../utility/util');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt || '';
  try {
    if (!token) {
      return res.status(401).json('You need to Login');
    }
    req.userID = decodeJWT(token);
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
