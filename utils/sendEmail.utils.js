require('dotenv').config();
const nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport(
  `smtps://${process.env.SMTP_USER}:` +
  encodeURIComponent(process.env.SMTP_PASS) +
  `@smtp.gmail.com:465`
);

module.exports = async (req, user, token) => {
  var mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: 'Account Verification Link',
    text:
      'Hello ' +
      user.fname +
      ' ' +
      user.lname +
      ',\n\n' +
      'Please verify your account by clicking the link: \nhttp://' +
      req.headers.host +
      '/user/verify/' +
      user.email +
      '/' +
      token +
      '\n\nThank You!\n',
  };
  const msg = await smtpTransport.sendMail(mailOptions);
  return msg;
};
