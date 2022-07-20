import { Request, Response } from 'express';
import { pg } from '../services';
import { ServerResponse } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signUp = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { username, password } = request.body;
    const users = await pg.query(`SELECT * FROM users WHERE username=$1`, [
      username,
    ]);

    const isUsernameAvailable = !(users.rows.length != 0);

    if (isUsernameAvailable) {
      const passwordHash = await bcrypt.hash(password, 10);
      await pg.query(
        `
          INSERT INTO users (username, password)
          VALUES ($1, $2)
        `,
        [username, passwordHash],
      );
      // const token = jwt.sign({ username }, 'TODO:SECRET_KEY');
      success.default();
    } else {
      error.usernameAlreadyTaken();
    }
  } catch (e) {
    error.couldNotSignUp();
  }
};

const signIn = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { username, password } = request.body;
    const users = await pg.query(`SELECT * FROM users WHERE username=$1`, [
      username,
    ]);

    const isUser = users.rows.length === 1;

    if (isUser) {
      const user = users.rows[0];
      const isSamePassword = await bcrypt.compare(password, user.password);

      if (isSamePassword) {
        const token = jwt.sign({ username }, 'TODO:SECRET_KEY');
        success.default({ token });
      } else {
        error.wrongCredentials();
      }
    } else {
      error.userNotFound();
    }
  } catch (e) {
    error.couldNotSignIn();
  }
};

const me = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const JWT = request.headers.authorization?.split(' ')[1];
    const result = jwt.verify(JWT!, 'TODO:SECRET_KEY');
    success.default({ result });
  } catch (e) {
    error.default();
  }
};

const refresh = async (request: Request, response: Response) => {
  try {
  } catch (error) {}
};

export { signUp, signIn, me, refresh };
