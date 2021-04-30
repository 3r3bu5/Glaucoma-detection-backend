const { v4: uuidv4 } = require('uuid');
// require models
const User = require('../model/user.model');
const Token = require('../model/token.model');
const { getToken: jwtToken } = require('../utils/jwt.utils');
const sendVefiyEmail = require('../utils/sendEmail.utils');
// logging
const loggerService = require('../services/logger.service');
var logger = new loggerService('user.controller');
// error handling
const APIError = require('../error/api.error');
const ErrorStatus = require('../error/errorStatusCode');
const ErrorType = require('../error/errorType');
// audit
const { handleAuditing } = require('../audit/audit');
const actionTypes = require('../audit/actionTypes');

exports.register = async (req, res, next) => {
  try {
    const user = await User.register(
      new User({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
      }),
      req.body.password
    );
    const savedUser = await user.save();
    var token = new Token({ _userId: savedUser._id, token: uuidv4() });
    await token.save();
    sendVefiyEmail(req, user, token.token);
    logger.info(
      `REGISTER: registered a new user with email address ${savedUser.email}`
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, msg: 'Registration Successful!' });
  } catch (err) {
    logger.error(
      `REGISTER: register error for email ${req.body.email} `,
      err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};

exports.login = (req, res, next) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.user.verfied != true) {
      throw new APIError(
        ErrorType.API_ENDPOINT_ERROR,
        ErrorStatus.FORBIDDEN,
        'Email is not verfied',
        true
      );
    }
    const token = jwtToken({ _id: req.user._id });
    logger.info(`LOGIN: issued a token for email address ${req.user.email}`);
    return res.json({
      status: true,
      message: 'Logged-In Successful!',
      id: req.user._id,
      firstname: req.user.fname,
      lastname: req.user.lname,
      email: req.user.email,
      token,
    });
  } catch (err) {
    logger.error(
      `LOGIN: error trying to issue JWT token error for email ${req.user.email} `,
      err.description || err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};

exports.verify = async (req, res, next) => {
  try {
    logger.info(
      `verify: trying to vefiy an email ${req.params.email} with token ${req.params.verifyToken}`
    );

    var token = await Token.findOne({ token: req.params.verifyToken });
    if (!token) {
      throw new APIError(
        ErrorType.API_ENDPOINT_ERROR,
        ErrorStatus.BAD_REQUEST,
        'Your verification link may have expired. Please click on resend to verify your Email',
        true
      );
    }
    // if token is found then check valid user
    else {
      var user = await User.findOne({
        _id: token._userId,
        email: req.params.email,
      });
      // not valid user
      if (!user) {
        throw new APIError(
          ErrorType.API_ENDPOINT_ERROR,
          ErrorStatus.UNAUTHORIZED,
          'We were unable to find a user for this verification token. Please SignUp!',
          true
        );
      }
      // user is already verified
      else if (user.verfied) {
        throw new APIError(
          ErrorType.API_ENDPOINT_ERROR,
          ErrorStatus.BAD_REQUEST,
          'User has been already verified. Please Login!',
          true
        );
      }
      // verify user
      else {
        // change verfied to true
        user.verfied = true;
        var user = await user.save();
        handleAuditing(actionTypes.verify_USER, user, 200, null, user._id);
        return res.status(200).send({
          status: true,
          msg: 'Your account has been successfully verified',
        });
      }
    }
  } catch (err) {
    logger.error(
      `verify: error trying to vefiy an email ${req.params.email} with token ${req.params.verifyToken}`,
      err.description || err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};

exports.resendLink = async (req, res, next) => {
  logger.info(
    `verify: trying to resend a verfication email to  ${req.params.email}`
  );
  try {
    var user = await User.findOne({ email: req.params.email });
    // user is not found into database
    if (!user) {
      throw new APIError(
        ErrorType.API_ENDPOINT_ERROR,
        ErrorStatus.BAD_REQUEST,
        'We were unable to find a user with that email. Make sure your Email is correct!',
        true
      );
    }
    // user has been already verified
    else if (user.verfied) {
      throw new APIError(
        ErrorType.API_ENDPOINT_ERROR,
        ErrorStatus.BAD_REQUEST,
        'This account has been already verified. Please log in!',
        true
      );
    }
    // send verification link
    else {
      // generate token and save
      var token = new Token({ _userId: user._id, token: uuidv4() });
      await token.save();
      sendVefiyEmail(req, user, token.token);
      handleAuditing(
        actionTypes.RESEND_VERFICATION_EMAIL,
        user,
        200,
        null,
        user._id
      );
      return res
        .status(200)
        .send({ status: true, msg: 'Verfication email has been sent!' });
    }
  } catch (err) {
    logger.error(
      `verify: error trying to resend verfication email ${req.params.email} `,
      err.description || err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};

exports.getCredit = async (req, res, next) => {
  try {
    var user = await User.findById(req.user._id);
    logger.info(`CREDITS: Get credits for user ${req.user.email} `);
    handleAuditing(actionTypes.GET_CREDITS, user, 200, null, req.user._id);
    return res.status(200).send({ credits: user.credits });
  } catch (err) {
    logger.error(
      `CREDITS: Error getting credits for user ${req.user.email} `,
      err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};
exports.updateCredit = async (req, res, next) => {
  try {
    var user = await User.findById(req.user._id);
    var credits = parseInt(req.body.credits);
    user.credits = user.credits + credits;
    updatedUser = await user.save();
    logger.info(`CREDITS: update credits for user ${req.user.email} `);
    handleAuditing(actionTypes.UPDATE_CREDITS, user, 200, null, req.user._id);
    return res
      .status(200)
      .send({ success: true, credits: updatedUser.credits });
  } catch (err) {
    logger.info(
      `CREDITS: Error updating credits for user ${req.user.email} `,
      err.message
    );
    res.setHeader('Content-Type', 'application/json');
    return res
      .status(err.httpStatusCode || 500)
      .json({ success: false, err: err.description || err.message });
  }
};
