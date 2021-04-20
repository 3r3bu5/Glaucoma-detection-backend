const express = require('express');
const router = express.Router();
// Authentication service
const passport = require('passport');
const authenticate = require('../services/auth.service');
const { verifyUser } = require('../services/jwtAuth.service');
const {
  login,
  register,
  verfiy,
  resendLink,
  getCredit,
  updateCredit,
} = require('../controller/userCtrl');

router.post('/signup', register);
router.post('/credits', verifyUser, getCredit);
router.post('/update_credits', verifyUser, updateCredit);
router.get('/verfiy/:email/:verfiyToken', verfiy);
router.get('/verfiy/:email/', resendLink);
router.post('/login', passport.authenticate('local'), login);

module.exports = router;
