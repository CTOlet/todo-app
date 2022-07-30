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
  const { error, success } = response;
  try {
    const { value: accessToken } = parseAuthHeader(
      request.headers.authorization,
    );
    const isValieAccessToken = verifyAccessToken(accessToken!);
    if (isValieAccessToken) {
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
