const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const imageSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    _patientId: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: 'patient',
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
    Imagelink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = imageSchema;
