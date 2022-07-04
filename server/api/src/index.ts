import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { Error } from './constants';

const app = express();
app.use(express.json(), cors());
// TODO: use compression, helmet, json, cors middlewares
// TODO: use i18n for error messages

const port = 3001;

const pool = new Pool({
  user: 'admin',
  password: 'admin',
  host: 'database',
  port: 5432,
  database: 'postgres',
});

app.post('/todo', (request, response) => {
  const { title, details } = request.body;
  const query = `
    INSERT INTO todos (title, details)
    VALUES ('${title}', '${details}')
  `;
  pool
    .query(query)
    .then((result) => response.send(result))
    .catch((error) => response.send(Error.COULD_NOT_POST_TODO));
});

app.get('/todos', (_, response) => {
  const query = `
    SELECT id, title, details
    FROM todos
  `;
  pool
    .query(query)
    .then((result) => response.send(result.rows))
    .catch((error) => response.send(Error.COULD_NOT_GET_TODOS));
});

app.get('/todo/:id', (request, response) => {
  const id = request.params.id;
  const query = `
    SELECT id, title, details
    FROM todos
    WHERE id='${id}'
  `;
  pool
    .query(query)
    .then((result) => response.send(result.rows[0]))
    .catch((error) => response.send(Error.COULD_NOT_GET_TODO));
});

app.put('/todo/:id', (request, response) => {
  const id = request.params.id;
  const { title, details } = request.body;
  const query = `
    UPDATE todos
    SET title='${title}', details='${details}'
    WHERE id='${id}'
  `;
  pool
    .query(query)
    .then((result) => response.send(result))
    .catch((error) => response.send(Error.COULD_NOT_PUT_TODO));
});

app.delete('/todo/:id', (request, response) => {
  const id = request.params.id;
  const query = `
    DELETE FROM todos
    WHERE id='${id}'
  `;
  pool
    .query(query)
    .then((result) => response.send(result))
    .catch((error) => response.send(Error.COULD_NOT_DELETE_TODO));
});

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
