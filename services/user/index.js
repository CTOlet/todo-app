const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/me', (req, res) => {
  res.json({ id: 1, username: 'jonny387' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
