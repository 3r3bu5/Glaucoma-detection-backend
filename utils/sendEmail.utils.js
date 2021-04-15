var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "Your Gmail ID",
    pass: "Gmail Password"
  }
});