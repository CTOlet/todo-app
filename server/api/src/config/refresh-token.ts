import { CookieOptions } from 'express';
import { Time } from '../constants';

const refreshTokenOptions = {
  expiresIn: Time.SECONDS.ONE_DAY,
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  // FIXME: only allow https
  // secure: true,
  sameSite: 'strict',
  maxAge: Time.SECONDS.ONE_DAY,
} as CookieOptions;

export { refreshTokenOptions, refreshTokenCookieOptions };
