import { Token, User } from '@prisma/client';
import { Duration } from '../constants';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { CookieOptions } from 'express';

type AuthorizationOptions = {
  accessToken: {
    expiresOn: number;
  };
  refreshToken: {
    expiresOn: number;
  };
};

const createAuthorization = (options: AuthorizationOptions) => {
  const api = {
    accessToken: {
      generate: ({ payload }: { payload: Pick<User, 'id' | 'username'> }) => {
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

      verify: (token: string) => {
        return !!jwt.verify(token, process.env.JWT_SECRET!);
      },

      decode: (token: string) => {
        return jwt.decode(token);
      },
    },

    refreshToken: {
      generate: () => {
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

      verify: ({
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
    },

    password: {
      hash: async (password: string) => {
        return await bcrypt.hash(password, 10);
      },

      verify: async ({
        password,
        passwordHash,
      }: {
        password: string;
        passwordHash: string;
      }) => {
        return await bcrypt.compare(password, passwordHash);
      },
    },
  };

  return api;
};

const Authorization = createAuthorization({
  accessToken: { expiresOn: Date.now() + Duration.ONE_HOUR },
  refreshToken: { expiresOn: Date.now() + Duration.ONE_DAY },
});

export { Authorization };
export type { AuthorizationOptions };
