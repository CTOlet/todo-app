import { CookieOptions } from 'express';
import { Duration } from '../constants';

const refreshTokenOptions = {
  expiresOn: Date.now() + Duration.ONE_DAY,
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  // FIXME: only allow https
  // secure: true,
  sameSite: 'strict',
  maxAge: Date.now() + Duration.ONE_DAY,
} as CookieOptions;

export { refreshTokenOptions, refreshTokenCookieOptions };
