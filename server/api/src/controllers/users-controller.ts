import { Request, Response } from 'express';
import {
  verifyPasswordHash,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken,
  parseCookies,
  verifyRefreshToken,
  setRefreshTokenCookie,
} from '../utils';
import {
  createTokenInDB,
  createUserInDB,
  getTokenFromDB,
  getUserFromDB,
  removeTokenFromDB,
  updateTokenInDB,
} from '../core/database';
import { Time } from '../constants';

const signUp = async (request: Request, response: Response) => {
  const { errorMessage: error, successMessage: success } = response;
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
  const { errorMessage: error, successMessage: success } = response;
  try {
    const { username, password } = request.body;

    const user = await getUserFromDB({ username });
    if (!user) {
      error.userNotFound();
      return;
    }

    const passwordHash = user.password;
    const isValidPassword = await verifyPasswordHash({
      password,
      passwordHash,
    });
    if (!isValidPassword) {
      error.wrongCredentials();
      return;
    }

    const accessToken = generateAccessToken({
      payload: { id: user.id, username },
    });
    const refreshToken = generateRefreshToken();
    await createTokenInDB({ userId: user.id, token: refreshToken });

    setRefreshTokenCookie({ value: refreshToken, response });

    success.default({ accessToken });
  } catch (e) {
    error.couldNotSignIn();
  }
};

const refresh = async (request: Request, response: Response) => {
  const { errorMessage: error, successMessage: success } = response;
  try {
    const { refreshToken: currentRefreshTokenClient } = parseCookies(
      request.headers.cookie,
    );
    const currentRefreshTokenServer = await getTokenFromDB({
      token: currentRefreshTokenClient,
    });

    const isValidRefreshToken = verifyRefreshToken({
      token: currentRefreshTokenClient,
      tokenFromDB: currentRefreshTokenServer,
    });
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
      payload: { id: user.id, username: user.username },
    });
    const newRefreshToken = generateRefreshToken();
    await updateTokenInDB({
      token: currentRefreshTokenServer.token,
      newToken: newRefreshToken,
    });

    setRefreshTokenCookie({ value: newRefreshToken, response });

    success.default({ accessToken: newAccessToken });
  } catch (e) {
    error.authenticationFailed();
  }
};

const signOut = async (request: Request, response: Response) => {
  const { errorMessage: error, successMessage: success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);

    await removeTokenFromDB({ token: refreshToken });

    setRefreshTokenCookie({ value: '', expiresIn: 0, response });

    success.default();
  } catch {
    error.default();
  }
};

export { signUp, signIn, refresh, signOut };
