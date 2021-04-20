const express = require('express');
const router = express.Router();
const {
  createPaymentIntents,
  updateCredit,
} = require('../controller/checkoutCtrl');
const { verifyUser } = require('../services/jwtAuth.service');

router.post('/payment_intents', verifyUser, createPaymentIntents);

module.exports = router;
