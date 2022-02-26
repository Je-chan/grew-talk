const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
});

module.exports = User;
