import { database as db } from '../services/database';
import { Request, Response } from 'express';
import { ServerResponse } from '../models';
import { Todo } from '../types';

const postTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { userId, status, title, description } = request.body;
    await db.query(
      `
        INSERT INTO todos (user_id, status, title, description)
        VALUES ($1, $2, $3, $4)
      `,
      [userId, status, title, description],
    );
    success.default();
  } catch (e) {
    error.couldNotAddTodo();
  }
};

const getTodos = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const todos = await db.query<Todo>(
      `
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
      `,
    );
    success.default(todos.rows);
  } catch (e) {
    error.couldNotGetTodo();
  }
};

const getTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const id = request.params.id;
    const todos = await db.query<Todo>(
      `
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
      `,
      [id],
    );
    success.default(todos.rows[0]);
  } catch (e) {
    error.couldNotGetTodo();
  }
};

const putTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const id = request.params.id;
    const { status, title, description } = request.body;
    await db.query(
      `
        UPDATE todos
        SET status=$2, title=$3, description=$4
        WHERE id=$1
      `,
      [id, status, title, description],
    );
    success.default();
  } catch (e) {
    error.couldNotUpdateTodo();
  }
};

const deleteTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const id = request.params.id;
    await db.query(
      `
        DELETE FROM todos
        WHERE id=$1
      `,
      [id],
    );
    success.default();
  } catch (e) {
    error.couldNotRemoveTodo();
  }
};

export { postTodo, getTodos, getTodo, putTodo, deleteTodo };
