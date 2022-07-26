import { CookieOptions } from 'express';
import { Duration } from '../constants';
import { getTimeInSeconds } from '../utils';

const refreshTokenOptions = {
  expiresOn: getTimeInSeconds() + Duration.ONE_DAY,
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  // FIXME: only allow https
  // secure: true,
  sameSite: 'strict',
  maxAge: Duration.ONE_DAY,
} as CookieOptions;

export { refreshTokenOptions, refreshTokenCookieOptions };
