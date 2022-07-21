import { ServerResponse } from '../models';
import { verifyAccessToken } from '../utils';
import { Request, Response, NextFunction } from 'express';

const verifyAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { error } = new ServerResponse(request, response);
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

export { verifyAuth };
