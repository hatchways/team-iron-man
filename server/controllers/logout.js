
const handleLogout = (req, res) => {
  const token = req.cookies.jwt || '';
  if (!token) {
    return res.status(401).json({ message: 'You need to Login' });
  }
  else {
    res.clearCookie('jwt');
    res.status(202).json({ message: 'Logged out' });
  }


};

module.exports = {
  handleLogout,
};
