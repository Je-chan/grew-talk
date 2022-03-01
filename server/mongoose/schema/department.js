const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, required: true },
  imgAddress: { type: String, default: null },
  // 원래는 계속 가변하는 데이터 Score 와 realtimeScore 는 따로 분리해서 사용하는 게 더 좋다.
  reviewScore: { type: Number, default: 3, required: true },
  realtimeScore: { type: Number, default: 0 },
});

module.exports = Department;
