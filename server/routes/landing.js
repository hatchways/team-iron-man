const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup = require('../controllers/signup');
const bcrypt = require('bcryptjs');

router.post('/login', (req, res) => {
  login.handleLogIn(req, res, bcrypt);
});

router.post('/signup', (req, res) => {
  signup.handleRegister(req, res, bcrypt);
});

module.exports = router;
