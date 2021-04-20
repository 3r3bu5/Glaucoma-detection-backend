const { v4: uuidv4 } = require('uuid');
// require models
const User = require('../model/user.model');
const Token = require('../model/token.model');
const { getToken: jwtToken } = require('../utils/jwt.utils');
const sendVefiyEmail = require('../utils/sendEmail.utils');

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
    const msg = sendVefiyEmail(req, user, token.token);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, status: 'Registration Successful!' });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, err });
  }
};

exports.login = (req, res, next) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.user.verfied != true) {
      return res.json({
        status: false,
        message: 'Please verfiy your email first!',
      });
    }
    const token = jwtToken({ _id: req.user._id });
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
    console.log(err);
  }
};

exports.verfiy = async (req, res, next) => {
  try {
    var token = await Token.findOne({ token: req.params.verfiyToken });
    if (!token) {
      return res.status(400).send({
        msg:
          'Your verification link may have expired. Please click on resend to verify your Email.',
      });
    }
    // if token is found then check valid user
    else {
      var user = await User.findOne({
        _id: token._userId,
        email: req.params.email,
      });
      // not valid user
      if (!user) {
        return res.status(401).send({
          msg:
            'We were unable to find a user for this verification. Please SignUp!',
        });
      }
      // user is already verified
      else if (user.verfied) {
        return res
          .status(200)
          .send({ msg: 'User has been already verified. Please Login' });
      }
      // verify user
      else {
        // change verfied to true
        user.verfied = true;
        var user = await user.save();
        return res
          .status(200)
          .send({ msg: 'Your account has been successfully verified' });
      }
    }
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

exports.resendLink = async (req, res, next) => {
  var user = await User.findOne({ email: req.params.email });
  // user is not found into database
  if (!user) {
    return res.status(400).send({
      msg:
        'We were unable to find a user with that email. Make sure your Email is correct!',
    });
  }
  // user has been already verified
  else if (user.verfied) {
    return res
      .status(200)
      .send({ msg: 'This account has been already verified. Please log in.' });
  }
  // send verification link
  else {
    // generate token and save
    var token = new Token({ _userId: user._id, token: uuidv4() });
    await token.save();
    const msg = sendVefiyEmail(req, user, token.token);
    return res.status(200).send({ msg: 'Verfication email has been sent!' });
  }
};

exports.getCredit = async (req, res, next) => {
  try {
    var user = await User.findById(req.user._id);
    return res.status(200).send({ credits: user.credits });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
};
exports.updateCredit = async (req, res, next) => {
  try {
    var user = await User.findById(req.user._id);
    var credits = parseInt(req.body.credits);
    user.credits = user.credits + credits;
    updatedUser = await user.save();
    return res
      .status(200)
      .send({ success: true, credits: updatedUser.credits });
  } catch (err) {
    return res.status(500).send({ success: false, err: err.message });
  }
};
