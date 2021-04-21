const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const auditSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  actionType: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  status: {
    type: Number,
    required: true,
  },
  error: {
    type: String,
  },
  auditBy: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'user',
  },
  createdAt: { type: Date, default: Date.now },
});

const Audit = mongoose.model('audit', auditSchema);

module.exports = Audit;
