const express = require('express');
const router = express.Router();
const { Article } = require('../mongoose/model');

router.get('/article/:id', async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  const comment = await Comment.find({ article: id });
  res.send({ article, comment });
});

// 개별 게시글을 가져오는 라우팅
module.exports = router;
