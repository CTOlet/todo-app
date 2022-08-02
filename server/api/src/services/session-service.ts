import { Token, User } from '@prisma/client';
import { Duration } from '../constants';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { CookieOptions } from 'express';

type SessionServiceOptions = {
  accessToken: {
    expiresOn: number;
  };
  refreshToken: {
    expiresOn: number;
  };
};

const createSessionService = (options: SessionServiceOptions) => {
  return {
    generateAccessToken: ({
      payload,
    }: {
      payload: Pick<User, 'id' | 'username'>;
    }) => {
      return {
        value: jwt.sign(payload, process.env.JWT_SECRET!, {
          // library expects seconds instead of milliseconds
          expiresIn: Math.round(
            (options.accessToken.expiresOn - Date.now()) / 1000,
          ),
        }),
        expiresOn: options.accessToken.expiresOn,
      };
    },

    verifyAccessToken: (token: string) => {
      return !!jwt.verify(token, process.env.JWT_SECRET!);
    },

    decodeAccessToken: (token: string) => {
      return jwt.decode(token);
    },

    generateRefreshToken: () => {
      return {
        value: crypto.randomBytes(48).toString('base64url'),
        expiresOn: options.refreshToken.expiresOn,
        cookie: {
          // FIXME: only allow https
          // secure: true,
          httpOnly: true,
          sameSite: 'strict',
          maxAge: options.refreshToken.expiresOn - Date.now(),
        } as CookieOptions,
      };
    },

    compareRefreshToken: ({
      token,
      tokenModel,
    }: {
      token: string;
      tokenModel?: Token | null;
    }) => {
      const isSameToken = token === tokenModel?.refreshToken;
      const isNotExpired =
        (tokenModel?.refreshTokenExpiresOn?.getTime() ?? 0) > Date.now();
      return isSameToken && isNotExpired;
    },
  };
};

const Session = createSessionService({
  accessToken: { expiresOn: Date.now() + Duration.ONE_HOUR },
  refreshToken: { expiresOn: Date.now() + Duration.ONE_DAY },
});

export { Session };
export type { SessionServiceOptions };
