import { Request, Response } from 'express';
import { ServerResponse } from '../models';
import {
  createTodoInDB,
  getTodoFromDB,
  getTodosFromDB,
  removeTodoFromDB,
  updateTodoInDB,
} from '../core/database';

const postTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { userId, status, title, description } = request.body;
    await createTodoInDB({ userId, status, title, description });
    success.default();
  } catch (e) {
    error.couldNotAddTodo();
  }
};

const getTodos = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const todos = await getTodosFromDB();
    success.default(todos);
  } catch (e) {
    error.couldNotGetTodo();
  }
};

const getTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const id = request.params.id;
    const todo = await getTodoFromDB({ id });
    success.default(todo);
  } catch (e) {
    error.couldNotGetTodo();
  }
};

const putTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const id = request.params.id;
    const { status, title, description } = request.body;
    await updateTodoInDB({ id, status, title, description });
    success.default();
  } catch (e) {
    error.couldNotUpdateTodo();
  }
};

const deleteTodo = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const id = request.params.id;
    await removeTodoFromDB({ id });
    success.default();
  } catch (e) {
    error.couldNotRemoveTodo();
  }
};

export { postTodo, getTodos, getTodo, putTodo, deleteTodo };
