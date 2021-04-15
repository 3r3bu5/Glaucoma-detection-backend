var jwt = require('jsonwebtoken');
exports.getToken = function (user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
};
