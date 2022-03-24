import express from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

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
    .then((result) => {
      response.send(result);
    })
    .catch((error) => response.send(error));
});

app.get('/todos', (_, response) => {
  const query = `
    SELECT id, title, details
    FROM todos
  `;
  pool
    .query(query)
    .then((result) => {
      response.send(result.rows);
    })
    .catch((error) => response.send(error));
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
    .then((result) => {
      response.send(result.rows[0]);
    })
    .catch((error) => response.send(error));
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
    .then((result) => {
      response.send(result);
    })
    .catch((error) => response.send(error));
});

app.delete('/todo/:id', (request, response) => {
  const id = request.params.id;
  const query = `
    DELETE FROM todos
    WHERE id='${id}'
  `;
  pool
    .query(query)
    .then((result) => {
      response.send(result);
    })
    .catch((error) => response.send(error));
});

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
