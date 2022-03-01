const express = require('express');
const cors = require('cors');
const { article, user, department } = require('./route');
const app = express();
const PORT = 9090;

app.use(cors());
app.use(express.json()); // req.body 를 위한 것
app.use(express.urlencoded({ extended: true }));

// 기능별 라우터 추가
app.use(article);
app.use(user);
app.use(department);

// 서버 상태 확인
app.get('/', (req, res) => {
  res.send('Server Is Running!');
});

app.listen(PORT, 'localhost', () => {
  console.log(`APP listening at http://localhost:${PORT}`);
});
