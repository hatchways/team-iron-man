const User = require('../models/UserModel');
const { JwtStrategy } = require('passport-jwt');

const cookieExtractor = (req) => {
  const jwt = req && req.cookies ? req.cookies['jwt'] : null;
  return jwt;
};

const options = {
  jwtFromRequest: cookieExtractor(),
  secretOrKey: process.env.SECRET_KEY,
};

const strategy = new JwtStrategy(options, (payload, done) => {
  if (Date.now() > payload.expires) {
    return done(null, false);
  }
  User.findOne({ _id: payload.id })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};
