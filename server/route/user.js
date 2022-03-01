const express = require('express');
const router = express.Router();
const { User } = require('../mongoose/model');

// 로그인 요청
router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await User.find({ email: email });

  if (!loginUser._id) {
    return res.send({
      error: true,
      msg: '존재하지 않는 이메일입니다. ',
    });
  }

  const correctPassword = await User.authenticate(password);
  if (!correctPassword) {
    return res.send({
      error: true,
      msg: '비밀번호 불일치',
    });
  }

  res.send({ email: loginUser, nickname: loginUser.nickname });
});

// 사용자 추가
router.post('/user/create', async (req, res) => {
  const { nickname, department, email, password } = req.body;
  const newUser = await User({
    email,
    nickname,
    password,
    department,
  }).save();

  console.log(newUser);

  res.send(newUser._id ? true : false);
});

module.exports = router;
