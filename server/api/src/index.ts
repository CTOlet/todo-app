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
    VALUES ($1, $2, $3)
  `;
  pool
    .query(query, [status, title, description])
    .then((result) => response.send(result))
    .catch((error) =>
      response.status(500).send(Error(ErrorType.POST_TODO_EXCEPTION, request)),
    );
});

app.get('/todos', (request, response) => {
  const query = `
    SELECT
      id,
      created_at AS "createdAt",
      updated_at AS "updatedAt",
      status,
      title,
      description
    FROM todos
    ORDER BY created_at DESC
  `;
  pool
    .query(query)
    .then((result) => response.send(result.rows))
    .catch((error) =>
      response.status(500).send(Error(ErrorType.GET_TODO_EXCEPTION, request)),
    );
});

app.get('/todo/:id', (request, response) => {
  const id = request.params.id;
  const query = `
    SELECT
      id,
      created_at AS "createdAt",
      updated_at AS "updatedAt",
      status,
      title,
      description
    FROM todos
    WHERE id=$1
  `;
  pool
    .query(query, [id])
    .then((result) => response.send(result.rows[0]))
    .catch((error) =>
      response.status(500).send(Error(ErrorType.GET_TODO_EXCEPTION, request)),
    );
});

app.put('/todo/:id', (request, response) => {
  const id = request.params.id;
  const { status, title, description } = request.body;
  const query = `
    UPDATE todos
    SET status=$2, title=$3, description=$4
    WHERE id=$1
  `;
  pool
    .query(query, [id, status, title, description])
    .then((result) => response.send(result))
    .catch((error) =>
      response.status(500).send(Error(ErrorType.PUT_TODO_EXCEPTION, request)),
    );
});

app.delete('/todo/:id', (request, response) => {
  const id = request.params.id;
  const query = `
    DELETE FROM todos
    WHERE id=$1
  `;
  pool
    .query(query, [id])
    .then((result) => response.send(result))
    .catch((error) =>
      response
        .status(500)
        .send(Error(ErrorType.DELETE_TODO_EXCEPTION, request)),
    );
});

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
