import { CookieOptions } from 'express';

const expiresInOneDay = 60 * 60 * 24;

const tokenOptions = {
  tokenName: 'refreshToken',
  tokenExpiresIn: expiresInOneDay,
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: expiresInOneDay,
  } as CookieOptions,
};

export { tokenOptions };
