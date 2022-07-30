import { Request, Response } from 'express';
import {
  createTodoInDB,
  getTodoFromDB,
  getTodosByUserFromDB,
  removeTodoFromDB,
  updateTodoInDB,
} from '../models';

const postTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { userId, status, title, description } = request.body;
    await createTodoInDB({ userId, status, title, description });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_add_todo') });
  }
};

const getTodos = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const todos = await getTodosByUserFromDB({ id: request.user?.id! });
    success({ data: todos });
  } catch (e) {
    error({ message: t('error_message.could_not_get_todo') });
  }
};

const getTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const id = request.params.id;
    const todo = await getTodoFromDB({ id });
    success({ data: todo });
  } catch (e) {
    error({ message: t('error_message.could_not_get_todo') });
  }
};

const putTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const id = request.params.id;
    const { status, title, description } = request.body;
    await updateTodoInDB({ id, status, title, description });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_update_todo') });
  }
};

const deleteTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const id = request.params.id;
    await removeTodoFromDB({ id });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_remove_todo') });
  }
};

export { postTodo, getTodos, getTodo, putTodo, deleteTodo };
