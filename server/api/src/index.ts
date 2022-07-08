import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import middleware from 'i18next-http-middleware';
import { Pool } from 'pg';
import { Error, ErrorType } from './models';
import i18next from 'i18next';
import { configureI18n } from './config/i18n';

configureI18n();

const app = express();
app.use(express.json(), cors(), helmet(), middleware.handle(i18next));

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
    .catch((error) =>
      response.send(Error(ErrorType.POST_TODO_EXCEPTION, request)),
    );
});

app.get('/todos', (request, response) => {
  const query = `
    SELECT id, title, details
    FROM todos
  `;
  pool
    .query(query)
    .then((result) => response.send(result.rows))
    .catch((error) =>
      response.send(Error(ErrorType.GET_TODO_EXCEPTION, request)),
    );
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
    .catch((error) =>
      response.send(Error(ErrorType.GET_TODO_EXCEPTION, request)),
    );
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
    .catch((error) =>
      response.send(Error(ErrorType.PUT_TODO_EXCEPTION, request)),
    );
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
    .catch((error) =>
      response.send(Error(ErrorType.DELETE_TODO_EXCEPTION, request)),
    );
});

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
