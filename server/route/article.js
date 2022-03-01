const express = require('express');
const router = express.Router();
const { Article } = require('../mongoose/model');

// 개별 게시글 가져오기
router.get('/article/:id', async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  const comment = await Comment.find({ article: id });
  res.send({ article, comment });
});

// 게시글 생성하기
router.post('/article/create', async (req, res) => {
  const { author, title, content, board } = req.body;

  const newArticle = await Article({
    author,
    title,
    content,
    board,
  }).save();

  res.send(newArticle);
});

// 게시글 수정하기
router.patch('/article/update', async (req, res) => {
  const { id, author, content } = req.body;
  const updatedArticle = await Article.findOneAndUpdate(
    // 여기는 where 구문
    {
      _id: id,
      author,
    },
    // 여기는 수정할 내용 부분
    {
      content,
    },
    {
      new: true,
    }
  );
  res.send(updatedArticle);
});

// 게시글 삭제하기
router.delete('/article/delete/hard', async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Comment.deleteOne({
    _id: id,
    author,
  });
  res.send(deletedArticle);
});

// 게시글 소프트 삭제
router.delete('/article/delete/soft', async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.deleteOne(
    {
      _id: id,
      author,
    },
    {
      // 30일 이후 삭제
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 60 * 1000,
    }
  );
  res.send(deletedArticle);
});

module.exports = router;
