import { Request, Response } from 'express';
import {
  verifyPasswordHash,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken,
  parseCookies,
  verifyRefreshToken,
  parseAuthHeader,
  verifyAccessToken,
} from '../utils';
import {
  createTokenInDB,
  createUserInDB,
  getTokenFromDB,
  getUserFromDB,
  removeTokenFromDB,
  updateTokenInDB,
} from '../core/database';
import { refreshTokenCookieOptions } from '../config';

const signUp = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { username, password } = request.body;

    const user = await getUserFromDB({ username });
    if (user) {
      error({ message: t('error_message.username_already_taken') });
      return;
    }

    const passwordHash = await generatePasswordHash(password);
    await createUserInDB({ username, password: passwordHash });

    success({ message: t('success_message.sign_up_completed') });
  } catch (e) {
    error({ message: t('error_message.could_not_sign_up') });
  }
};

const signIn = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { username, password } = request.body;

    const user = await getUserFromDB({ username });
    if (!user) {
      error({ message: t('error_message.user_not_found') });
      return;
    }

    const passwordHash = user.password;
    const isValidPassword = await verifyPasswordHash({
      password,
      passwordHash,
    });
    if (!isValidPassword) {
      error({ message: t('error_message.wrong_credentials') });
      return;
    }

    const accessToken = generateAccessToken({
      payload: { id: user.id, username },
    });
    const refreshToken = generateRefreshToken();
    await createTokenInDB({ userId: user.id, token: refreshToken });

    response.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    success({ data: { accessToken } });
  } catch (e) {
    error({ message: t('error_message.could_not_sign_in') });
  }
};

const refresh = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
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
      error({ message: t('error_message.token_expired') });
      return;
    }

    const user = await getUserFromDB({ id: currentRefreshTokenServer.userId });
    if (!user) {
      error({ message: t('error_message.user_not_found') });
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

    response.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions);
    success({ data: { accessToken: newAccessToken } });
  } catch (e) {
    error({ message: t('error_message.authentication_failed') });
  }
};

const signOut = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);

    await removeTokenFromDB({ token: refreshToken });

    response.cookie('refreshToken', null, { maxAge: 0 });
    success();
  } catch {
    error();
  }
};

export { signUp, signIn, refresh, signOut };
