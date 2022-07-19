import { Request, Response } from 'express';
import { ErrorType } from '../constants';
import { pg } from '../services';
import { Error } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signUp = async (request: Request, response: Response) => {
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
      response.send();
    } else {
      response
        .status(500)
        .send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
    }
  } catch (error) {
    response.status(500).send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
  }
};

const signIn = async (request: Request, response: Response) => {
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
        response.send({ token });
      } else {
        response
          .status(500)
          .send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
      }
    } else {
      response
        .status(500)
        .send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
    }
  } catch (error) {
    response.status(500).send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
  }
};

const me = async (request: Request, response: Response) => {
  try {
    const JWT = request.headers.authorization?.split(' ')[1];
    const result = jwt.verify(JWT!, 'TODO:SECRET_KEY');
    response.send(result);
  } catch (error) {
    response.status(500).send(Error(ErrorType.SIGN_UP_USER_EXCEPTION, request));
  }
};

const refresh = async (request: Request, response: Response) => {
  try {
  } catch (error) {}
};

export { signUp, signIn, me, refresh };
