const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Article = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // 동적으로 변동될 수 있는 데이터
  viewCount: { type: Number, default: 0 },
  thumbupCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  deleteTime: { type: Number, default: 0 },

  // 옵션: 사용자가 게시글에 추가할 수 있는 데이터
  articleImgAddress: { type: String },
  mention: { type: Schema.Types.ObjectId, ref: 'User' },
});

// mongoose-sequence 를 사용하기 위한 코드
// id 는 하나씩 올라가게 되니까 id로 계산하는 게 훨씬 쉽다.
// 그런데 id 라고 한다면 몽고DB 에서 기본적으로 저장되는 _id 와 헷갈리기 때문에
// 여기서는 key 라는 이름으로 지정해준다.
Article.plugin(AutoIncrement, { inc_field: 'key' });

module.exports = Article;
