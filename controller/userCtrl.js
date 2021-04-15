// require models
const User = require('../model/user.model');

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
  res.json({ status: true, message: 'Logged-In Successful!' });
};
