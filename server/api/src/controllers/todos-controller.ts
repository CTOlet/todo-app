import { prisma } from '../database';
import { Request, Response } from 'express';

const postTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { userId, status, title, description } = request.body;
    await prisma.todo.create({
      data: { user: { connect: { id: userId } }, status, title, description },
    });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_add_todo') });
  }
};

const getTodos = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const userId = request.user?.id;
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    success({ data: todos });
    return;
  } catch (e) {
    error({ message: t('error_message.could_not_get_todo') });
  }
};

const getTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const userId = request.user?.id;
    const todoId = request.params.id;
    const todo = await prisma.todo.findFirst({
      where: { userId, AND: { id: parseInt(todoId) } },
    });
    success({ data: todo });
  } catch (e) {
    error({ message: t('error_message.could_not_get_todo') });
  }
};

const putTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const userId = request.user?.id;
    const todoId = request.params.id;
    const { status, title, description } = request.body;
    const todo = await prisma.todo.findFirst({
      where: { userId, AND: { id: parseInt(todoId) } },
    });
    await prisma.todo.update({
      where: { id: todo?.id },
      data: { status, title, description },
    });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_update_todo') });
  }
};

const deleteTodo = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const userId = request.user?.id;
    const todoId = request.params.id;
    const todo = await prisma.todo.findFirst({
      where: { userId, AND: { id: parseInt(todoId) } },
    });
    await prisma.todo.delete({
      where: { id: todo?.id },
    });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_remove_todo') });
  }
};

export { postTodo, getTodos, getTodo, putTodo, deleteTodo };
