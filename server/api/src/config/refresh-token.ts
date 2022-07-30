import { CookieOptions } from 'express';
import { Duration } from '../constants';
import { getTimeInSeconds } from '../utils';

const refreshTokenOptions = {
  expiresOn: getTimeInSeconds() + Duration.SECONDS.ONE_DAY,
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  // FIXME: only allow https
  // secure: true,
  sameSite: 'strict',
  maxAge: Duration.SECONDS.ONE_DAY * 1000,
} as CookieOptions;

export { refreshTokenOptions, refreshTokenCookieOptions };
