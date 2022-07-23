import { Request, Response } from 'express';
import { ServerResponse } from '../models';
import {
  verifyPassword,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken,
  parseCookies,
  verifyRefreshToken,
} from '../utils';
import {
  createTokenInDB,
  createUserInDB,
  getTokenFromDB,
  getUserFromDB,
  updateTokenInDB,
} from '../core/database';

const signUp = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { username, password } = request.body;

    const user = await getUserFromDB({ username });
    if (user) {
      error.usernameAlreadyTaken();
      return;
    }

    const passwordHash = await generatePasswordHash(password);
    await createUserInDB({ username, password: passwordHash });

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

    const user = await getUserFromDB({ username });
    if (!user) {
      error.userNotFound();
      return;
    }

    const passwordHash = user.password;
    const isValidPassword = await verifyPassword(password, passwordHash);
    if (!isValidPassword) {
      error.wrongCredentials();
      return;
    }

    // const { value: currentAccessToken } = parseAuthHeader(
    //   request.headers.authorization,
    // );
    // const { refreshToken: currentRefreshToken } = parseCookies(
    //   request.headers.cookie,
    // );
    // const {
    //   rows: [refreshTokenServer],
    // } = await db.query<RefreshToken>(
    //   `
    //     SELECT
    //       id,
    //       user_id AS "userId",
    //       created_at AS "createdAt",
    //       updated_at AS "updatedAt",
    //       token,
    //       expires_in AS "expiresIn"
    //     FROM tokens WHERE token=$1
    //   `,
    //   [currentRefreshToken],
    // );
    // const isAccessTokenValid = verifyAccessToken(currentAccessToken!);
    // const isRefreshTokenValid = verifyRefreshToken(
    //   currentRefreshToken,
    //   refreshTokenServer,
    // );
    // if (isAccessTokenValid || isRefreshTokenValid) {
    //   error.alreadySignedIn();
    //   return;
    // }

    const accessToken = generateAccessToken({ id: user.id, username });
    const refreshToken = generateRefreshToken();
    await createTokenInDB({ userId: user.id, token: refreshToken });

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
    const { refreshToken: currentRefreshTokenClient } = parseCookies(
      request.headers.cookie,
    );
    const currentRefreshTokenServer = await getTokenFromDB({
      token: currentRefreshTokenClient,
    });

    const isValidRefreshToken = verifyRefreshToken(
      currentRefreshTokenClient,
      currentRefreshTokenServer,
    );
    if (!isValidRefreshToken) {
      error.tokenExpired();
      return;
    }

    const user = await getUserFromDB({ id: currentRefreshTokenServer.userId });
    if (!user) {
      error.userNotFound();
      return;
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });
    const newRefreshToken = generateRefreshToken();
    await updateTokenInDB({
      token: currentRefreshTokenServer.token,
      newToken: newRefreshToken,
    });

    // TODO: set correct cookie options
    response.cookie('refreshToken', newRefreshToken, { httpOnly: true });
    success.default({ accessToken: newAccessToken });
  } catch (e) {
    error.authenticationFailed();
  }
};

const signOut = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    response.cookie('refreshToken', null, {
      expires: new Date(0),
      maxAge: 0,
    });
    success.default();
  } catch {
    error.default();
  }
};

export { signUp, signIn, refresh, signOut };
