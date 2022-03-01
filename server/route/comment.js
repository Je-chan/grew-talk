const express = require('express');
const router = express.Router();
const { Comment } = require('../mongoose/model');

// 댓글 생성하기
router.post('/comment/create', async (req, res) => {
  const { author, article, content } = req.body;
  const newComment = await Comment({ author, article, content }).save();
  res.send(newComment._id ? true : false);
});

// 댓글 수정하기
router.patch('/comment/update', async (req, res) => {
  const { id, author, content } = req.body;
  const updatedComment = await Comment.findOneAndUpdate(
    // 여기는 where 구문
    {
      _id: id,
      author,
    },
    // 여기는 수정할 내용 부분
    {
      content,
    }
  );
  console.log(updatedComment);
  res.send(updatedComment);
});

// 댓글 삭제하기
router.delete('/comment/delete/hard', async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.deleteOne({
    _id: id,
    author,
  });
  console.log(deletedComment);
  res.send(deletedComment);
});

// 댓글 소프트 삭제
router.delete('/comment/delete/soft', async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.deleteOne(
    {
      _id: id,
      author,
    },
    {
      // 30일 이후 삭제
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 60 * 1000,
    }
  );
  console.log(deletedComment);
  res.send(deletedComment);
});

module.exports = router;
