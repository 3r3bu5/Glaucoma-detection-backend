const Joi = require('joi');
exports.patientValidationSchema = (req) => {
  var schema;
  if (req.route.path === '/new') {
    schema = Joi.object({
      body: Joi.object({
        lname: Joi.string().min(3).max(30).required().alphanum(),
        fname: Joi.string().min(3).max(30).required().alphanum(),
        age: Joi.number().required().integer(),
        gender: Joi.string().required(),
      }),
      params: {},
    });
  } else if (
    req.route.path === '/:patientId/history' ||
    req.route.path === '/:patientId/delete' ||
    req.route.path === '/:patientId'
  ) {
    schema = Joi.object({
      body: {},
      params: Joi.object({
        patientId: Joi.string().required().alphanum(),
      }),
    });
  } else if (req.route.path === '/:patientId/history/:historyId') {
    schema = Joi.object({
      body: {},
      params: Joi.object({
        patientId: Joi.string().required().alphanum(),
        historyId: Joi.string().required().alphanum(),
      }),
    });
  } else if (req.route.path === '/:patientId/edit') {
    schema = Joi.object({
      body: Joi.object({
        lname: Joi.string().min(3).max(30),
        fname: Joi.string().min(3).max(30),
        age: Joi.number().integer(),
        gender: Joi.string(),
      }),
      params: Joi.object({
        patientId: Joi.string().required().alphanum(),
      }),
    });
  }

  return schema;
};
