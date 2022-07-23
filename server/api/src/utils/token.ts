import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Token, User } from '../types';

const generateAccessToken = (payload: Pick<User, 'id' | 'username'>) => {
  return jwt.sign(payload, process.env.JWT_SECRET!);
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
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
