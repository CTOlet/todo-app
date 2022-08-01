import { Token } from '@prisma/client';
import crypto from 'crypto';
import { refreshTokenCookieOptions, refreshTokenOptions } from '../config';

const generateRefreshToken = () => {
  return {
    value: crypto.randomBytes(48).toString('base64url'),
    expiresOn: refreshTokenOptions.expiresOn,
    cookieOptions: refreshTokenCookieOptions,
  };
};

const verifyRefreshToken = ({
  tokenClient,
  tokenServer,
}: {
  tokenClient: string;
  tokenServer?: Token | null;
}) => {
  const isSameToken = tokenClient === tokenServer?.refreshToken;
  const isNotExpired =
    (tokenServer?.refreshTokenExpiresOn?.getTime() ?? 0) > Date.now();
  return isSameToken && isNotExpired;
};

export { generateRefreshToken, verifyRefreshToken };
