import jwt from 'jsonwebtoken';
import { User } from '../types';
import { accessTokenOptions } from '../config';
import { getTimeInSeconds } from './timestamp';

const generateAccessToken = ({
  payload,
  options = accessTokenOptions,
}: {
  payload: Pick<User, 'id' | 'username'>;
  options?: typeof accessTokenOptions;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: accessTokenOptions.expiresOn - getTimeInSeconds(),
  });
};

const verifyAccessToken = (token: string) => {
  return !!jwt.verify(token, process.env.JWT_SECRET!);
};

const decodeAccessToken = (token: string) => {
  return jwt.decode(token);
};

export { generateAccessToken, verifyAccessToken, decodeAccessToken };
