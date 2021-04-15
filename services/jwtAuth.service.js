require('dotenv').config();
var passport = require('passport');
var { Strategy } = require('passport-jwt');
var { ExtractJwt } = require('passport-jwt');
var User = require('../model/user.model');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

exports.JWTpassport = passport.use(
  new Strategy(opts, async function (payload, done) {
    try {
      const user = await User.findOne({ _id: payload._id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

exports.verifyUser = passport.authenticate('jwt', { session: false });
