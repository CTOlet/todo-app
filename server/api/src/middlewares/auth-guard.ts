import { createResponse } from '../services';
import { verifyAccessToken } from '../utils';
import { Request, Response, NextFunction } from 'express';

const authGuard = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { error } = createResponse({ request, response });
  try {
    const JWT = request.headers.authorization?.split(' ')[1];
    const isAccessTokenValid = !!verifyAccessToken(JWT!);
    if (isAccessTokenValid) {
      next();
    } else {
      error.authenticationFailed();
    }
  } catch (e) {
    error.authenticationFailed();
  }
};

export { authGuard };
