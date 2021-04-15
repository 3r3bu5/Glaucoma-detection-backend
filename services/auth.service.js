const passport = require('passport');
const User = require('../model/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email' }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
