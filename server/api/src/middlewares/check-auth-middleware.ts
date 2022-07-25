import { verifyAccessToken } from '../utils';
import { Request, Response, NextFunction } from 'express';

const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const JWT = request.headers.authorization?.split(' ')[1];
    const isAccessTokenValid = !!verifyAccessToken(JWT!);
    if (isAccessTokenValid) {
      next();
    } else {
      response.errorMessage.authenticationFailed();
    }
  } catch (e) {
    response.errorMessage.authenticationFailed();
  }
};

export { checkAuth };
