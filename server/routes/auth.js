const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup = require('../controllers/signup');
const changeUserName = require('../controllers/changeUserName');
const changePassword = require('../controllers/changePassword');
const { authUser } = require('../controllers/authLogin');
const verifyToken = require('../middlewares/authentication');

router.post('/login', (req, res) => {
  login.handleLogIn(req, res);
});

router.post('/signup', (req, res) => {
  signup.handleRegister(req, res);
});

router.post('/changeusername', verifyToken, changeUserName.handleChangeUserName);

router.post('/changepassword', verifyToken, changePassword.handleChangePassword);

router.get('/authLogin', authUser);

module.exports = router;
