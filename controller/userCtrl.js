// require models
const User = require('../model/user.model');
const { getToken } = require('../utils/jwt.utils');

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
    const token = getToken({ _id: savedUser._id });
    res.setHeader('Content-Type', 'application/json');
    res
      .status(200)
      .json({ success: true, status: 'Registration Successful!', token });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, err });
  }
};

exports.login = (req, res, next) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  const token = getToken({ _id: req.user._id });
  res.json({ status: true, message: 'Logged-In Successful!', token });
};
