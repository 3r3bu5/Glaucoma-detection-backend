const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
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
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    eye: {
      type: Number,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = patientSchema;
