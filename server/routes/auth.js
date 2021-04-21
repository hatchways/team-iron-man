const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup = require('../controllers/signup');
const bcrypt = require('bcryptjs');

router.post('/login', (req, res) => {
  login.handleLogIn(req, res);
});

router.post('/signup', (req, res) => {
  signup.handleRegister(req, res);
});

module.exports = router;
