const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eyeOptions = Object.freeze({
  Left: 'left',
  Right: 'right',
});

const scanSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    _patientId: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: 'patient',
    },
    eye: {
      type: String,
      enum: Object.values(eyeOptions),
      required: true,
    },
    result: {
      type: Number,
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
const Scan = mongoose.model('scan', scanSchema);

module.exports = Scan;
