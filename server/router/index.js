const { Article } = require('../mongoose/model');

// 개별 게시글을 가져오는 라우팅
const getArticle = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.send(article);
};

module.exports = {
  getArticle,
};
