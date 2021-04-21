const stripe = require('stripe')(process.env.STRIPE_SK_KEY);
// logging
const loggerService = require('../services/logger.service');
var logger = new loggerService('checkout.controller');
// error handling
const APIError = require('../error/api.error');
const ErrorStatus = require('../error/errorStatusCode');
const ErrorType = require('../error/errorType');

exports.createPaymentIntents = async (req, res, next) => {
  try {
    if (!req.body.NumberOfCredits) {
      throw new APIError(
        ErrorType.API_ENDPOINT_ERROR,
        ErrorStatus.INTERNAL_SERVER_ERROR,
        'Number of credits is required',
        true
      );
    }
    const amount = parseFloat(
      (Math.round(req.body.NumberOfCredits * 0.5 * 100) / 100).toFixed(2)
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
    });
    logger.info(
      `CHECKOUT: issued a payment intent token for email address ${req.user.email} with ${req.body.NumberOfCredits} credits`
    );
    res.status(200).send({ success: true, data: paymentIntent.client_secret });
  } catch (err) {
    logger.error(
      `CHECKOUT: error issuing a payment intent token for email address ${req.user.email} with ${req.body.NumberOfCredits} credits`,
      err.description || err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};
