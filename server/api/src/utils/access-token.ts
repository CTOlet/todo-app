import jwt from 'jsonwebtoken';
import { User } from '../types';
import { accessTokenOptions } from '../config';

const generateAccessToken = ({
  payload,
  options = accessTokenOptions,
}: {
  payload: Pick<User, 'id' | 'username'>;
  options?: typeof accessTokenOptions;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: accessTokenOptions.expiresOn,
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export { generateAccessToken, verifyAccessToken };
