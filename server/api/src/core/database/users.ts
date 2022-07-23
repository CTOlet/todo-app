import { database as db } from '../../services';
import { User } from '../../types';

const createUserInDB = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await db.query(
    `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
    `,
    [username, password],
  );
};

const getUserFromDB = async ({
  id,
  username,
}: {
  id?: string;
  username?: string;
}) => {
  if (id) {
    const {
      rows: [user],
    } = await db.query<User>(`SELECT * FROM users WHERE id=$1`, [id]);
    return user;
  } else if (username) {
    const {
      rows: [user],
    } = await db.query<User>(`SELECT * FROM users WHERE username=$1`, [
      username,
    ]);
    return user;
  } else {
    return {} as User;
  }
};

export { createUserInDB, getUserFromDB };
