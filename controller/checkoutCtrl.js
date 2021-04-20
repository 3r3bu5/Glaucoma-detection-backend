const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

exports.createPaymentIntents = async (req, res, next) => {
  try {
    const amount = parseFloat(
      (Math.round(req.body.NumberOfCredits * 0.5 * 100) / 100).toFixed(2)
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
    });
    res.status(200).send({ data: paymentIntent.client_secret });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ success: false, err: err.message });
  }
};
