import crypto from 'crypto';
import { Pool } from 'pg';
import { RefreshToken } from '../types';

const generateRefreshToken = () => {
  return crypto.randomBytes(48).toString('base64url');
};

const verifyRefreshToken = (token: string, compareToken: RefreshToken) => {
  const isSameToken = token === compareToken.token;
  const isNotExpired = compareToken.expiresIn > Math.trunc(Date.now() / 1000);
  return isSameToken && isNotExpired;
};

export { generateRefreshToken, verifyRefreshToken };
