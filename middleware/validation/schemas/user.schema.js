const Joi = require('joi');
exports.userValidationSchema = (req) => {
  var schema;
  if (req.route.path === '/login') {
    schema = Joi.object({
      body: Joi.object({
        password: Joi.string().required().max(255),
        email: Joi.string().required().email(),
      }),
      params: {},
    });
  } else if (req.route.path === '/signup') {
    schema = Joi.object({
      body: Joi.object({
        password: Joi.string().required().max(255),
        email: Joi.string().required().email(),
        lname: Joi.string().min(3).max(30).required().alphanum(),
        fname: Joi.string().min(3).max(30).required().alphanum(),
      }),
      params: {},
    });
  } else if (req.route.path === '/update_credits') {
    schema = Joi.object({
      body: Joi.object({
        credits: Joi.number().required().min(1).max(255),
      }),
      params: {},
    });
  } else if (req.route.path === '/check') {
    schema = Joi.object({
      body: Joi.object({
        token: Joi.string().required(),
      }),
      params: {},
    });
  } else if (req.route.path === '/verify/:email/') {
    schema = Joi.object({
      body: {},
      params: Joi.object({
        email: Joi.string().required().email(),
      }),
    });
  } else if (req.route.path === '/verify/:email/:verifyToken') {
    schema = Joi.object({
      body: {},
      params: Joi.object({
        email: Joi.string().required().email(),
        verifyToken: Joi.string().required(),
      }),
    });
  }

  return schema;
};
