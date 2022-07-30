import { database as db } from '../database';
import { Todo, User } from '../types';

const createTodoInDB = async ({
  userId,
  status,
  title,
  description,
}: Pick<Todo, 'userId' | 'status' | 'title' | 'description'>) => {
  return await db.query(
    `
      INSERT INTO todos (user_id, status, title, description)
      VALUES ($1, $2, $3, $4)
    `,
    [userId, status, title, description],
  );
};

const getTodosFromDB = async () => {
  const { rows: todos } = await db.query<Todo>(
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
  return todos;
};

const getTodosByUserFromDB = async ({ id }: Pick<User, 'id'>) => {
  const { rows: todos } = await db.query<Todo>(
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
      WHERE user_id=$1
      ORDER BY created_at DESC
    `,
    [id],
  );
  return todos;
};

const getTodoFromDB = async ({ id }: Pick<Todo, 'id'>) => {
  const {
    rows: [todo],
  } = await db.query<Todo>(
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
  return todo;
};

const updateTodoInDB = async ({
  id,
  status,
  title,
  description,
}: Pick<Todo, 'id' | 'status' | 'title' | 'description'>) => {
  return await db.query(
    `
      UPDATE todos
      SET status=$2, title=$3, description=$4
      WHERE id=$1
    `,
    [id, status, title, description],
  );
};

const removeTodoFromDB = async ({ id }: Pick<Todo, 'id'>) => {
  return await db.query(
    `
      DELETE FROM todos
      WHERE id=$1
    `,
    [id],
  );
};

export {
  createTodoInDB,
  getTodosFromDB,
  getTodosByUserFromDB,
  getTodoFromDB,
  updateTodoInDB,
  removeTodoFromDB,
};
