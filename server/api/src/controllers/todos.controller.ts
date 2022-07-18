import { pg } from '../services/postgresql';
import { Request, Response } from 'express';
import { ErrorType } from '../constants';
import { Error } from '../models/error.model';

const postTodo = async (request: Request, response: Response) => {
  try {
    const { userId, status, title, description } = request.body;
    const query = `
      INSERT INTO todos (user_id, status, title, description)
      VALUES ($1, $2, $3, $4)
    `;

    const result = await pg.query(query, [userId, status, title, description]);
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.POST_TODO_EXCEPTION, request));
  }
};

const getTodos = async (request: Request, response: Response) => {
  try {
    const query = `
      SELECT
        id,
        user_id AS "userId",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        status,
        title,
        description
      FROM todos
      ORDER BY created_at DESC
    `;

    const result = await pg.query(query);
    response.send(result.rows);
  } catch (error) {
    response.status(500).send(Error(ErrorType.GET_TODO_EXCEPTION, request));
  }
};

const getTodo = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const query = `
      SELECT
        id,
        user_id AS "userId",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        status,
        title,
        description
      FROM todos
      WHERE id=$1
    `;

    const result = await pg.query(query, [id]);
    response.send(result.rows[0]);
  } catch (error) {
    response.status(500).send(Error(ErrorType.GET_TODO_EXCEPTION, request));
  }
};

const putTodo = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const { status, title, description } = request.body;
    const query = `
      UPDATE todos
      SET status=$2, title=$3, description=$4
      WHERE id=$1
    `;

    const result = await pg.query(query, [id, status, title, description]);
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.PUT_TODO_EXCEPTION, request));
  }
};

const deleteTodo = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const query = `
      DELETE FROM todos
      WHERE id=$1
    `;

    const result = await pg.query(query, [id]);
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.DELETE_TODO_EXCEPTION, request));
  }
};

export { postTodo, getTodos, getTodo, putTodo, deleteTodo };
