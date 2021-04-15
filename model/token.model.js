const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tokenSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  _userId: { type: mongoose.Schema.Types.String, required: true, ref: 'user' },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: '24h', default: Date.now },
});

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;
