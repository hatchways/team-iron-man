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


const decodeJWT = (token) => {
  const decrypt = jwt.verify(token, process.env.SECRET_KEY);
  return decrypt.id;
};

const compare = (a, b) => {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

const bisectLeft = (a, x) => {
  let lo = 0;
  let hi = a.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (compare(a[mid], x) < 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

module.exports = {
  genJWT,
  decodeJWT,
  compare,
  bisectLeft
};
