import { Duration } from '../constants';

const accessTokenOptions = {
  expiresOn: Date.now() + Duration.ONE_HOUR,
};

export { accessTokenOptions };
