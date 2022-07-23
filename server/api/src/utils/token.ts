import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { RefreshToken } from '../types';

const generateAccessToken = <T extends Record<any, any>>(payload: T) => {
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

const verifyRefreshToken = (token: string, compareToken: RefreshToken) => {
  const isSameToken = token === compareToken.token;
  const isNotExpired = compareToken.expiresIn > Math.trunc(Date.now() / 1000);
  return isSameToken && isNotExpired;
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
