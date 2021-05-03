
const handleLogout = async(req, res) => {
  const token = req.cookies.jwt || '';
  if (!token) {
    return res.status(401).json({ message: 'You need to Login' });
  }
  else {
    //return res.status(202).clearCookie('jwt').json({ message: 'Logged out' });
    await res.clearCookie('jwt');
    res.status(202).json({ message: 'Logged out' });
  }


};

module.exports = {
  handleLogout,
};
