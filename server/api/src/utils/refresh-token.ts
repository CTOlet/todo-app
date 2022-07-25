import { Token } from '../types';
import crypto from 'crypto';

const generateRefreshToken = () => {
  return crypto.randomBytes(48).toString('base64url');
};

const verifyRefreshToken = ({
  token,
  tokenFromDB,
}: {
  token: string;
  tokenFromDB: Token;
}) => {
  const isSameToken = token === tokenFromDB.token;
  const isNotExpired = tokenFromDB.expiresIn > Math.trunc(Date.now() / 1000);
  return isSameToken && isNotExpired;
};

export { generateRefreshToken, verifyRefreshToken };
