const express = require('express');
const router = express.Router();
const { Reply } = require('../mongoose/model');

// 대댓글 생성하기
router.post('/reply/create', async (req, res) => {
  const { author, comment, content } = req.body;
  const newReply = await Reply({ author, comment, content }).save();
  res.send(newReply._id ? true : false);
});

// 대댓글 수정하기
router.patch('/reply/update', async (req, res) => {
  const { id, author, content } = req.body;
  const updatedReply = await Reply.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      content,
    },
    {
      new: true,
    }
  );
  res.send(updatedReply);
});

// 대댓글 완전 삭제(HARD DELETE - DB 자체에도 존재하지 않는 것)
router.delete('/reply/delete/hard', async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.deleteOne({
    _id: id,
    author,
  });
  res.send(deletedReply);
});

// 대댓글 소프트 삭제(SOFT DELETE - 일반 사용자는 보지 못하는 상태, 일정 기간이 지나면 삭제될 상태로 냅두는 것)
router.delete('/reply/delete/soft', async (req, res) => {
  const { id, author } = req.body;
  const deletedReply = await Reply.deleteOne(
    {
      _id: id,
      author,
    },
    {
      // 30일 이후 삭제
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 60 * 1000,
    }
  );
  res.send(deletedReply);
});

module.exports = router;
