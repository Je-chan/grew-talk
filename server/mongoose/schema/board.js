const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now, required: true },
});

module.exports = Board;
