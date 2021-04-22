const Joi = require('joi');
exports.checkoutValidationSchema = (req) => {
  var schema;
  if (req.route.path === '/payment_intents') {
    schema = Joi.object({
      body: Joi.object({
        NumberOfCredits: Joi.number().required().integer().min(1),
      }),
      params: {},
    });
  }
  return schema;
};
