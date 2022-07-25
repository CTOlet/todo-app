import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Token, User } from '../types';
import { Time } from '../constants';
import { Response } from 'express';

const generateAccessToken = ({
  payload,
  expiresIn = Time.SECONDS.ONE_HOUR,
}: {
  payload: Pick<User, 'id' | 'username'>;
  expiresIn?: number;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

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

const setRefreshTokenCookie = ({
  value,
  expiresIn = Time.SECONDS.ONE_DAY,
  response,
}: {
  value: string;
  expiresIn?: number;
  response: Response;
}) => {
  response.cookie('refreshToken', value, {
    httpOnly: true,
    // FIXME: only allow https
    // secure: true,
    sameSite: 'strict',
    maxAge: expiresIn,
  });
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
};
