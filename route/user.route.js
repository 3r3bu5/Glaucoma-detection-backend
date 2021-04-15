const express = require('express');
const router = express.Router();
// Authentication service
const passport = require('passport');
const authenticate = require('../services/auth.service');
const {
  login,
  register,
  verfiy,
  resendLink,
} = require('../controller/userCtrl');

router.post('/signup', register);
router.get('/verfiy/:email/:verfiyToken', verfiy);
router.get('/verfiy/:email/', resendLink);
router.post('/login', passport.authenticate('local'), login);

module.exports = router;
