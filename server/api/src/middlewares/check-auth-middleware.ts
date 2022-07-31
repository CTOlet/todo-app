import {
  decodeAccessToken,
  parseAuthHeader,
  verifyAccessToken,
} from '../utils';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

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
    const isValidAccessToken = verifyAccessToken(accessToken!);
    if (isValidAccessToken) {
      const { id, username } = decodeAccessToken(accessToken!) as JwtPayload;
      request.user = {
        id,
        username,
      };
      next();
    } else {
      error({ message: request.t('error_message.authentication_failed') });
    }
  } catch (e) {
    error({ message: request.t('error_message.authentication_failed') });
  }
};

export { checkAuth };
