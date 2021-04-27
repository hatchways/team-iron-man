const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup = require('../controllers/signup');
const { authUser } = require('../controllers/authLogin');

router.post('/login', (req, res) => {
  login.handleLogIn(req, res);
});

router.post('/signup', (req, res) => {
  signup.handleRegister(req, res);
});

router.get('/authLogin', authUser);

module.exports = router;
