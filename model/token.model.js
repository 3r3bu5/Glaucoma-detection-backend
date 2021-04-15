const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const tokenSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  _userId: { type: mongoose.Schema.Types.String, required: true, ref: 'user' },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }
});


const Token = mongoose.model('token', tokenSchema);

module.exports = Token;
