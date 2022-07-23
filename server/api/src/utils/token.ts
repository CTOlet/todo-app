import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Token, User } from '../types';

const generateAccessToken = (payload: Pick<User, 'id' | 'username'>) => {
  // TODO: set global server secret key
  return jwt.sign(payload, 'SECRET_KEY');
};

const verifyAccessToken = (token: string) => {
  // TODO: set global server secret key
  return jwt.verify(token, 'SECRET_KEY');
};

const generateRefreshToken = () => {
  return crypto.randomBytes(48).toString('base64url');
};

const verifyRefreshToken = (token: string, tokenFromDB: Token) => {
  const isSameToken = token === tokenFromDB.token;
  const isNotExpired = tokenFromDB.expiresIn > Math.trunc(Date.now() / 1000);
  return isSameToken && isNotExpired;
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
