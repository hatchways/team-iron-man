const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup = require('../controllers/signup');
const logout = require('../controllers/logout');
const userSettings = require('../controllers/userSettings');
const { authUser } = require('../controllers/authLogin');
const verifyToken = require('../middlewares/authentication');

router.post('/login', (req, res) => {
  login.handleLogIn(req, res);
});

router.post('/signup', (req, res) => {
  signup.handleRegister(req, res);
});

router.post('/changeusername', verifyToken, userSettings.handleChangeUserName);

router.post('/changepassword', verifyToken, userSettings.handleChangePassword);

router.post('/changeavatar', verifyToken, userSettings.handleChangeAvatar);

router.get('/authLogin', authUser);

router.get('/logout', logout.handleLogout);

module.exports = router;
