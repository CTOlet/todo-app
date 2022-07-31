import jwt from 'jsonwebtoken';
import { accessTokenOptions } from '../config';
import { getTimeInSeconds } from './timestamp';

const generateAccessToken = ({ payload }: { payload: Record<string, any> }) => {
  return {
    value: jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: accessTokenOptions.expiresOn - getTimeInSeconds(),
    }),
    expiresOn: accessTokenOptions.expiresOn,
  };
};

const verifyAccessToken = (token: string) => {
  return !!jwt.verify(token, process.env.JWT_SECRET!);
};

const decodeAccessToken = (token: string) => {
  return jwt.decode(token);
};

export { generateAccessToken, verifyAccessToken, decodeAccessToken };
