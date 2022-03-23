import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'admin',
  password: 'admin',
  host: 'database',
  port: 5432,
  database: 'postgres',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/now', (req, res) => {
  pool
    .query('SELECT NOW()')
    .then((val) => {
      res.send(val);
    })
    .catch((err) => res.send(err));
});

app.get('/todos', (req, res) => {
  pool
    .query('SELECT * FROM todos')
    .then((val) => {
      res.send(val);
    })
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
