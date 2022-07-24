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
  removeTokenFromDB,
  updateTokenInDB,
} from '../core/database';
import { tokenOptions } from '../config';

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

    success.signUpCompleted();
  } catch (e) {
    error.couldNotSignUp();
  }
};

const signIn = async (request: Request, response: Response) => {
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

    const accessToken = generateAccessToken({ id: user.id, username });
    const refreshToken = generateRefreshToken();
    await createTokenInDB({ userId: user.id, token: refreshToken });

    response.cookie(
      tokenOptions.tokenName,
      refreshToken,
      tokenOptions.cookieOptions,
    );
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

    response.cookie(
      tokenOptions.tokenName,
      newRefreshToken,
      tokenOptions.cookieOptions,
    );
    success.default({ accessToken: newAccessToken });
  } catch (e) {
    error.authenticationFailed();
  }
};

const signOut = async (request: Request, response: Response) => {
  const { error, success } = new ServerResponse(request, response);
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);

    await removeTokenFromDB({ token: refreshToken });

    response.cookie(tokenOptions.tokenName, null, {
      expires: new Date(0),
      maxAge: 0,
    });
    success.default();
  } catch {
    error.default();
  }
};

export { signUp, signIn, refresh, signOut };
