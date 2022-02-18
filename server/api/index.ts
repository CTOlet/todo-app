import express from 'express';
import pgp from 'pg-promise';

const app = express();
const db = pgp({})('postgres://admin:admin@http://database:5432/database');
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
