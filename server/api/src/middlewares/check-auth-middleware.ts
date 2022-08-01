import { parseAuthHeader } from '../utils';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../database';
import { AuthorizationService } from '../services';

const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { error } = response;
  try {
    const { value: accessToken } = parseAuthHeader(
      request.headers.authorization,
    );
    const isValidAccessToken = AuthorizationService.accessToken.verify(
      accessToken!,
    );
    if (isValidAccessToken) {
      const { id, username } = AuthorizationService.accessToken.decode(
        accessToken!,
      ) as JwtPayload;
      const user = await prisma.user.findUnique({ where: { id } });
      request.user = user ? user : undefined;
      next();
    } else {
      error({ message: request.t('error_message.authentication_failed') });
    }
  } catch (e) {
    error({ message: request.t('error_message.authentication_failed') });
  }
};

export { checkAuth };
