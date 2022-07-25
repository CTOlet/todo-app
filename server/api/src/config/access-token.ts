import { SignOptions } from 'jsonwebtoken';
import { Time } from '../constants';

const accessTokenOptions = {
  expiresIn: Time.SECONDS.ONE_HOUR,
} as SignOptions;

export { accessTokenOptions };
