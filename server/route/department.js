const express = require('express');
const router = express.Router();
const { Department } = require('../mongoose/model');

// 부서 추가
router.post('/company/create', async (req, res) => {
  const { name } = req.body;
  const newDepartment = await Department({
    name,
  }).save();

  console.log(newDepartment);

  res.send(newDepartment._id ? true : false);
});

// 개별 게시글을 가져오는 라우팅
module.exports = router;
