const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9090;

app.use(cors());
app.use(express.json()); // req.body 를 위한 것
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server Is Running!');
});

app.listen(PORT, 'localhost', () => {
  console.log(`APP listening at http://localhost:${PORT}`);
});
