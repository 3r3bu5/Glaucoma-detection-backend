const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    verfied: {
      type: Boolean,
      default: true,
    },
    verfiyString: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('user', UserSchema);

module.exports = User;
