const express = require('express');
const router = express.Router();
const { Article, Board } = require('../mongoose/model');

// 메인에서 여러 게시판 글을 모아서 보여주는 라우트
router.get('/main', async (req, res) => {
  // board 전체를 가져 온다.
  const board = await Board.find();
  // 만약 board 가 배열로 나오지 않으면 에러인 것.
  if (!Array.isArray(board)) {
    res.send({
      error: true,
      msg: '게시판을 발견할 수 없음',
    });
  }

  let mainContent = [];

  // 여러 게시물을 다 모은 다음에 한 번에 보내버린다는 의미.
  // map 함수를 돌려 버린다.
  Promise.all(
    board.map(async (b) => {
      // 최신 게시물들을 가져올 수 있다.
      const recentArticles = await Article.find({ board: b._id });
      if (!Array.isArray(recentArticles)) {
        return;
      }
      mainContent.push({
        // _doc의 형태로 Object 가 들어온다.

        ...b._doc,
        content: recentArticles,
      });
    })
  )
    .then(() => {
      res.send({
        content: mainContent,
        error: false,
        msg: '성공',
      });
    })
    .catch((err) => {
      console.error(err);
      res.send({
        content: null,
        error: true,
        msg: '서버 에러',
      });
    });
});

// 게시판 목록을 불러오는 라우트
router.get('/board/list', async (req, res) => {
  const board = await Board.find();
  res.send(board);
});

// 게시판별 게시글 가져오는 라우트
router.get('/board/:slug', async (req, res) => {
  const { slug } = req.params;
  const { lastIndex } = req.query; // 무한 스크롤 구현시 사용할 부분

  const board = await Board.findOne({ slug });
  if (!board._id) {
    return res.send({
      article: [],
      error: true,
      msg: '존재하지 않는 게시판',
    });
  }

  const findOption = {
    board: board._id,
  };

  if (lastIndex !== '0') {
    findOption._id = { $lt: lastIndex };
  }

  const article = await Article.find(findOption)
    .sort({ _id: -1 })
    .limit(6)
    .populate({
      path: 'author',
      populate: { path: 'department' },
    });

  const formatedArtilce = article.map((v) => {
    return {
      ...v._doc,
      author: {
        ...v._doc.author._doc,
        nickname: `${v._doc.author._doc.nickname[0]}${'*'.repeat(
          v._doc.author._doc.nickname.length - 1
        )}`,
      },
    };
  });
  res.send({ article: formatedArtilce, error: false, msg: '성공' });
});

// 관리자용 게시판 추가
router.post('/board/create', async (req, res) => {
  const { title, slug } = req.body;
  const newBoard = await Board({
    title,
    slug,
  }).save();

  res.send(newBoard._id ? true : false);
});

module.exports = router;
