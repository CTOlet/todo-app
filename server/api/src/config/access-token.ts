import { SignOptions } from 'jsonwebtoken';
import { Duration } from '../constants';
import { getTimeInSeconds } from '../utils';

const accessTokenOptions = {
  expiresOn: getTimeInSeconds() + Duration.ONE_HOUR,
} as SignOptions;

export { accessTokenOptions };
