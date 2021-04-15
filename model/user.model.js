const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const patientSchema = require('./patient.model');

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
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
      default: false,
    },
    patient: [patientSchema],
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('user', UserSchema);

module.exports = User;
