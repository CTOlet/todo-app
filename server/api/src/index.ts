import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import middleware from 'i18next-http-middleware';
import { Pool } from 'pg';
import { Error } from './models';
import i18next from 'i18next';
import { configureI18n } from './config/i18n';
import { ErrorType } from './constants';

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
  const { status, title, description } = request.body;
  const query = `
    INSERT INTO todos (status, title, description)
    VALUES ('${status}', '${title}', '${description}')
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
    SELECT id, status, title, description
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
    SELECT id, status, title, description
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
  const { status, title, description } = request.body;
  const query = `
    UPDATE todos
    SET status='${status}', title='${title}', description='${description}'
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
