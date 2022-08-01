import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { accessTokenOptions } from '../config';

const generateAccessToken = ({
  payload,
}: {
  payload: Pick<User, 'id' | 'username'>;
}) => {
  return {
    value: jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: accessTokenOptions.expiresOn / 1000 - Date.now() / 1000,
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
