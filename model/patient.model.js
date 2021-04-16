const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Genders = Object.freeze({
  Male: 'male',
  Female: 'female',
  Other: 'other',
});

const patientSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    _doctorId: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: 'user',
    },
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
      type: String,
      enum: Object.values(Genders),
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;
