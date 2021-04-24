const express = require('express');
const router = express.Router();
// Authentication service
const passport = require('passport');
const authenticate = require('../services/auth.service');
const { verifyUser } = require('../services/jwtAuth.service');
const {
  login,
  register,
  verify,
  resendLink,
  getCredit,
  updateCredit,
} = require('../controller/userCtrl');
// validation
const {
  validateUserInput,
} = require('../middleware/validation/validation.midd');
const validationType = require('../middleware/validation/action');
const { rateLimiter } = require('../middleware/ratelimiter.midd');

router.post(
  '/signup',
  rateLimiter,
  validateUserInput(validationType.USER),
  register
);
router.get('/credits', verifyUser, getCredit);
router.post(
  '/update_credits',
  rateLimiter,
  verifyUser,
  validateUserInput(validationType.USER),
  updateCredit
);
router.get(
  '/verify/:email/:verifyToken',
  rateLimiter,
  validateUserInput(validationType.USER),
  verify
);
router.get(
  '/verify/:email/',
  rateLimiter,
  validateUserInput(validationType.USER),
  resendLink
);
router.post(
  '/login',
  rateLimiter,
  validateUserInput(validationType.USER),
  passport.authenticate('local'),
  login
);

module.exports = router;
