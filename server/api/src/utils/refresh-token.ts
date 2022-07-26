import { Token } from '../types';
import crypto from 'crypto';
import { getTimeInSeconds } from './timestamp';

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
  const isNotExpired = tokenFromDB.expiresOn > getTimeInSeconds();
  return isSameToken && isNotExpired;
};

export { generateRefreshToken, verifyRefreshToken };
