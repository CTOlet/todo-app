import { Request, Response } from 'express';
import {
  verifyPasswordHash,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken,
  parseCookies,
  verifyRefreshToken,
} from '../utils';
import { prisma } from '../database';

const signUp = async (request: Request, response: Response) => {
  const {
    t,
    body: { username, password },
  } = request;
  const { error, success } = response;
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      error({ message: t('error_message.username_already_taken') });
      return;
    }

    const passwordHash = await generatePasswordHash(password);
    await prisma.user.create({ data: { username, password: passwordHash } });

    success({ message: t('success_message.sign_up_completed') });
  } catch (e) {
    error({ message: t('error_message.could_not_sign_up') });
  }
};

const signIn = async (request: Request, response: Response) => {
  const {
    t,
    body: { username, password },
  } = request;
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);

    const isWithCredentials = !!username && !!password;
    const isWithToken = !!refreshToken;

    if (isWithCredentials && isWithToken) {
      refresh(request, response);
      return;
    } else if (isWithCredentials) {
      const user = await prisma.user.findUnique({ where: { username } });

      if (user) {
        const isValidPassword = await verifyPasswordHash({
          password,
          passwordHash: user.password,
        });

        if (isValidPassword) {
          const accessToken = generateAccessToken({
            payload: { id: user.id, username },
          });
          const refreshToken = generateRefreshToken();

          await prisma.token.create({
            data: {
              user: { connect: { id: user.id } },
              accessToken: accessToken.value,
              accessTokenExpiresOn: new Date(accessToken.expiresOn),
              refreshToken: refreshToken.value,
              refreshTokenExpiresOn: new Date(refreshToken.expiresOn),
            },
          });

          response.cookie(
            'refreshToken',
            refreshToken.value,
            refreshToken.cookieOptions,
          );
          success({ data: { accessToken: accessToken.value } });
          return;
        } else {
          error({ message: t('error_message.wrong_credentials') });
          return;
        }
      } else {
        error({ message: t('error_message.user_not_found') });
        return;
      }
    } else if (isWithToken) {
      const token = await prisma.token.findFirst({
        where: { refreshToken },
      });
      const isValidRefreshToken = verifyRefreshToken({
        tokenClient: refreshToken,
        tokenServer: token,
      });

      if (isValidRefreshToken) {
        success({ data: { accessToken: token?.accessToken } });
        return;
      } else {
        error({ message: t('error_message.token_expired') });
        return;
      }
    } else {
      error({ message: t('error_message.authentication_failed') });
      return;
    }
  } catch (e) {
    error({ message: t('error_message.could_not_sign_in') });
  }
};

const refresh = async (request: Request, response: Response) => {
  const { t } = request;
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);
    const token = await prisma.token.findFirst({ where: { refreshToken } });

    const isValidRefreshToken = verifyRefreshToken({
      tokenClient: refreshToken,
      tokenServer: token,
    });

    if (isValidRefreshToken) {
      const user = await prisma.user.findUnique({
        where: { id: token?.userId },
      });
      if (user) {
        const accessToken = generateAccessToken({
          payload: { id: user.id, username: user.username },
        });
        const refreshToken = generateRefreshToken();

        await prisma.token.update({
          where: { id: token?.id },
          data: {
            user: { connect: { id: user.id } },
            accessToken: accessToken.value,
            accessTokenExpiresOn: new Date(accessToken.expiresOn),
            refreshToken: refreshToken.value,
            refreshTokenExpiresOn: new Date(refreshToken.expiresOn),
          },
        });

        response.cookie(
          'refreshToken',
          refreshToken,
          refreshToken.cookieOptions,
        );
        success({ data: { accessToken: accessToken.value } });
      } else {
        error({ message: t('error_message.user_not_found') });
        return;
      }
    } else {
      error({ message: t('error_message.token_expired') });
      return;
    }
  } catch (e) {
    error({ message: t('error_message.authentication_failed') });
  }
};

const signOut = async (request: Request, response: Response) => {
  const { error, success } = response;
  try {
    const { refreshToken } = parseCookies(request.headers.cookie);
    const token = await prisma.token.findFirst({ where: { refreshToken } });
    await prisma.token.delete({ where: { id: token?.id } });
    response.cookie('refreshToken', null, { maxAge: 0 });
    success();
  } catch {
    error();
  }
};

export { signUp, signIn, refresh, signOut };
