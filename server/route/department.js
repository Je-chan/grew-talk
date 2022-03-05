const express = require('express');
const router = express.Router();
const { Department } = require('../mongoose/model');

// 부서 추가
router.post('/department/create', async (req, res) => {
  const { name } = req.body;
  const newDepartment = await Department({
    name,
  }).save();

  console.log(newDepartment);

  res.send(newDepartment._id ? true : false);
});

// 인기 있는 부서 목록 불러오기
router.get('/department/list/famous', async (req, res) => {
  const department = await Department.find()
    .limit(10)
    .sort({ realtimeScore: -1 });

  res.send(department);
});

module.exports = router;
