import { Request, Response } from 'express';
import { pg } from '../services';
import { ServerResponse } from '../models';
import {
  comparePasswordHash,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken,
  verifyAccessToken,
} from '../utils';
import { User } from '../types';

const signUp = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { username, password } = request.body;
    const users = await pg.query<User>(
      `SELECT * FROM users WHERE username=$1`,
      [username],
    );

    const isUsernameAvailable = !(users.rows.length != 0);

    if (isUsernameAvailable) {
      const passwordHash = await generatePasswordHash(password);
      await pg.query(
        `
          INSERT INTO users (username, password)
          VALUES ($1, $2)
        `,
        [username, passwordHash],
      );
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
    const users = await pg.query<User>(
      `SELECT * FROM users WHERE username=$1`,
      [username],
    );

    const isUser = users.rows.length === 1;

    if (isUser) {
      const user = users.rows[0];
      const isSamePassword = await comparePasswordHash(password, user.password);

      if (isSamePassword) {
        const accessToken = generateAccessToken({ id: user.id, username });
        const refreshToken = generateRefreshToken();
        response.cookie('refreshToken', refreshToken, {
          /* TODO: options */
        });
        success.default({ accessToken });
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
    const result = verifyAccessToken(JWT!);
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
