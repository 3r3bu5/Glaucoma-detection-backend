const express = require('express');
const router = express.Router();
// Authentication service
const passport = require('passport');
const authenticate = require('../services/auth.service');
const { login, register } = require('../controller/userCtrl');

router.post('/signup', register);
router.post('/login', passport.authenticate('local'), login);

module.exports = router;
