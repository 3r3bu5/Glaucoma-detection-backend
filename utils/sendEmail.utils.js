require('dotenv').config();
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

var smtpTransport = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
}))

module.exports = async (req, user, token) => {
  var mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: 'Glaucoma Lab - Account Verification Link',
    text:
      'Hello ' +
      user.fname +
      ' ' +
      user.lname +
      ',\n\n' +
      'Please verify your account by clicking the link: \n' +
      process.env.CLIENT_URL +
      '/verification/' +
      user.email +
      '/' +
      token +
      '\n\nThank You!\n',
  };
  const msg = await smtpTransport.sendMail(mailOptions);
  return msg;
};
