const mongoose = require('mongoose');
const schema = require('./schema');

const db = mongoose.connection;
const model = (() => {
  db.on('error', console.error);
  db.on('open', () => {
    console.log('Connecting mongodb');
  });

  // 몽고 DB 앱 엑세스 주소
  mongoose.connect();

  // 스키마 연결
  const model = {};

  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }

  return model;
})();

module.exports = model;
