const { userValidationSchema } = require('./schemas/user.schema');
const { patientValidationSchema } = require('./schemas/patient.schema');
const { checkoutValidationSchema } = require('./schemas/checkout.schema');
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};
const validationType = require('./action');

exports.validateUserInput = (route) => {
  return async function (req, res, next) {
    if (route === validationType.USER) {
      schema = userValidationSchema(req, res, next);
    } else if (route === validationType.PATIENT) {
      schema = patientValidationSchema(req, res, next);
    } else if (route === validationType.CHECKOUT) {
      schema = checkoutValidationSchema(req, res, next);
    }
    // validate request body against schema
    const { error, value } = schema.validate(
      { body: req.body, params: req.params },
      options
    );

    if (error) {
      err = {
        message: error.details[0].message,
      };
      return next({ status: false, err });
    } else {
      req.body = value.body;
      req.params = value.params;
      next();
    }
  };
};
