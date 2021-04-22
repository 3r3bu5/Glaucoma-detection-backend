const express = require('express');
const router = express.Router();
const { createPaymentIntents } = require('../controller/checkoutCtrl');
const { verifyUser } = require('../services/jwtAuth.service');
const {
  validateUserInput,
} = require('../middleware/validation/validation.midd');
const validationType = require('../middleware/validation/action');
router.post(
  '/payment_intents',
  verifyUser,
  validateUserInput(validationType.CHECKOUT),
  createPaymentIntents
);

module.exports = router;
