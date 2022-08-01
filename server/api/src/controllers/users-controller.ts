import { Request, Response } from 'express';
import { parseCookies } from '../utils';
import { prisma } from '../database';
import { Authorization } from '../services';

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

    const passwordHash = await Authorization.password.hash(password);
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
    const user = username
      ? await prisma.user.findUnique({ where: { username } })
      : null;

    if (user && refreshToken) {
      error({ message: t('error_message.already_signed_in') });
      return;
    }

    if (user) {
      const isValidPassword = await Authorization.password.verify({
        password,
        passwordHash: user.password,
      });

      if (isValidPassword) {
        const accessToken = Authorization.accessToken.generate({
          payload: { id: user.id, username },
        });
        const refreshToken = Authorization.refreshToken.generate();

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
          refreshToken.cookie,
        );
        success({ data: { accessToken: accessToken.value } });
        return;
      } else {
        error({ message: t('error_message.wrong_credentials') });
        return;
      }
    }

    if (refreshToken) {
      const token = await prisma.token.findFirst({
        where: { refreshToken },
      });

      const isValidRefreshToken = Authorization.refreshToken.verify({
        token: refreshToken,
        tokenModel: token,
      });

      if (isValidRefreshToken) {
        success({ data: { accessToken: token?.accessToken } });
        return;
      } else {
        error({ message: t('error_message.token_expired') });
        return;
      }
    }

    error({ message: t('error_message.authentication_failed') });
    return;
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

    const isValidRefreshToken = Authorization.refreshToken.verify({
      token: refreshToken,
      tokenModel: token,
    });

    if (isValidRefreshToken) {
      const user = await prisma.user.findUnique({
        where: { id: token?.userId },
      });
      if (user) {
        const accessToken = Authorization.accessToken.generate({
          payload: { id: user.id, username: user.username },
        });
        const refreshToken = Authorization.refreshToken.generate();

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
          refreshToken.value,
          refreshToken.cookie,
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

    if (refreshToken) {
      const token = await prisma.token.findFirst({ where: { refreshToken } });
      await prisma.token.delete({ where: { id: token?.id } });
    }

    response.cookie('refreshToken', null, { maxAge: 0 });
    success();
  } catch {
    error();
  }
};

export { signUp, signIn, refresh, signOut };
