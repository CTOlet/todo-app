import { Request, Response } from 'express';
import { parseCookies } from '../utils';
import { prisma } from '../database';
import { AuthorizationService } from '../services';

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

    const passwordHash = await AuthorizationService.password.hash(password);
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
        const isValidPassword = await AuthorizationService.password.verify({
          password,
          passwordHash: user.password,
        });

        if (isValidPassword) {
          const accessToken = AuthorizationService.accessToken.genererate({
            payload: { id: user.id, username },
          });
          const refreshToken = AuthorizationService.refreshToken.genererate();

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
            refreshToken.name,
            refreshToken.value,
            refreshToken.cookie,
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

      const isValidRefreshToken = AuthorizationService.refreshToken.verify({
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

    const isValidRefreshToken = AuthorizationService.refreshToken.verify({
      token: refreshToken,
      tokenModel: token,
    });

    if (isValidRefreshToken) {
      const user = await prisma.user.findUnique({
        where: { id: token?.userId },
      });
      if (user) {
        const accessToken = AuthorizationService.accessToken.genererate({
          payload: { id: user.id, username: user.username },
        });
        const refreshToken = AuthorizationService.refreshToken.genererate();

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
          refreshToken.name,
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
    const token = await prisma.token.findFirst({ where: { refreshToken } });
    await prisma.token.delete({ where: { id: token?.id } });
    const refreshTokenCookieName =
      AuthorizationService.getOptions().refreshToken.name;
    response.cookie(refreshTokenCookieName, null, { maxAge: 0 });
    success();
  } catch {
    error();
  }
};

export { signUp, signIn, refresh, signOut };
