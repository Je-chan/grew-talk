const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Article = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // 동적으로 변동될 수 있는 데이터
  viewCount: { type: Number, default: 0 },
  thumbupCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },

  // 옵션: 사용자가 게시글에 추가할 수 있는 데이터
  articleImgAddress: { type: String },
  mention: { type: Schema.Types.ObjectId, ref: 'User' },
});

// mongoose-sequence 를 사용하기 위한 코드
// id 는 하나씩 올라가게 되니까 id로 계산하는 게 훨씬 쉽다.
Article.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = Article;
