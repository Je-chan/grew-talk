const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
});

// password 가상 선택자.
// 유저를 생성할 때 password 를 받고 처리
User.virtual('password').set(function (password) {
  (this._password = password),
    (this.salt = this.makeSalt()),
    (this.hashedPassword = this.encryptPassword(password));
});

// Salt 생성 함수
User.method('makeSalt', function () {
  return (
    Math.round(new Date().valueOf() * Math.random()) + 'passwordgoodforondlove'
  );
});

// 해쉬된 비밀번호 생성 함수
// 데이터를 저장하고, 동시에 로그인을 할 때도 이렇게 작동해야 한다.
User.method('encryptPassword', function (plainPassword) {
  return crypto
    .createHmac('sha256', this.salt)
    .update(plainPassword)
    .digest('hex');
});

// 사용자 인증 함수
// 인증 요청할 때도 이 함수를 사용하면 된다
User.method('authenticate', function (plainPassword) {
  const inputPassword = this.encryptPassword(plainPassword);
  return inputPassword === this.hashedPassword;
});

module.exports = User;
