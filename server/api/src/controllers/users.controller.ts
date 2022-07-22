import { Request, Response } from 'express';
import { pg } from '../services';
import { ServerResponse } from '../models';
import {
  verifyPassword,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken,
  parseCookies,
  verifyRefreshToken,
} from '../utils';
import { RefreshToken, User } from '../types';

const signUp = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { username, password } = request.body;

    const users = await pg.query<User>(
      `SELECT * FROM users WHERE username=$1`,
      [username],
    );

    const isUsernameAvailable = !(users.rows.length != 0);
    if (!isUsernameAvailable) {
      error.usernameAlreadyTaken();
      return;
    }

    const passwordHash = await generatePasswordHash(password);

    await pg.query(
      `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
      `,
      [username, passwordHash],
    );

    success.default();
  } catch (e) {
    error.couldNotSignUp();
  }
};

const signIn = async (request: Request, response: Response) => {
  // TODO: do not allow multiple calls if already signed in
  const { error, success } = new ServerResponse(request, response);
  try {
    const { username, password } = request.body;

    const users = await pg.query<User>(
      `SELECT * FROM users WHERE username=$1`,
      [username],
    );

    const isUserFound = users.rows.length === 1;
    if (!isUserFound) {
      error.userNotFound();
      return;
    }

    const [user] = users.rows;
    const passwordHash = user.password;

    const isValidPassword = await verifyPassword(password, passwordHash);
    if (!isValidPassword) {
      error.wrongCredentials();
      return;
    }

    const accessToken = generateAccessToken({ id: user.id, username });
    const refreshToken = generateRefreshToken();

    await pg.query(
      `
        INSERT INTO tokens (user_id, token, expires_in)
        VALUES ($1, $2, $3)
      `,
      // TODO: set correct expiration
      [user.id, refreshToken, Math.trunc((Date.now() + 86400000) / 1000)],
    );

    // TODO: set correct cookie options
    response.cookie('refreshToken', refreshToken, { httpOnly: true });
    success.default({ accessToken });
  } catch (e) {
    error.couldNotSignIn();
  }
};

const refresh = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { refreshToken: refreshTokenClient } = parseCookies(
      request.headers.cookie,
    );

    const {
      rows: [refreshTokenServer],
    } = await pg.query<RefreshToken>(
      `
        SELECT
          id,
          user_id AS "userId",
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          token,
          expires_in AS "expiresIn"
        FROM tokens WHERE token=$1
      `,
      [refreshTokenClient],
    );

    const isValidRefreshToken = verifyRefreshToken(
      refreshTokenClient,
      refreshTokenServer,
    );
    if (!isValidRefreshToken) {
      error.tokenExpired();
      return;
    }

    const users = await pg.query<User>(`SELECT * FROM users WHERE id=$1`, [
      refreshTokenServer.userId,
    ]);

    const isUserFound = users.rows.length === 1;
    if (!isUserFound) {
      error.userNotFound();
      return;
    }

    const [user] = users.rows;
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = generateRefreshToken();

    await pg.query<RefreshToken>(
      `
        UPDATE tokens
        SET token=$1, expires_in=$2
        WHERE token=$3
      `,
      // TODO: set correct expiration
      [
        refreshToken,
        Math.trunc((Date.now() + 86400000) / 1000),
        refreshTokenServer.token,
      ],
    );

    // TODO: set correct cookie options
    response.cookie('refreshToken', refreshToken, { httpOnly: true });
    success.default({ accessToken });
  } catch (e) {
    error.authenticationFailed();
  }
};

export { signUp, signIn, refresh };
