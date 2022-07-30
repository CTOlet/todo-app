import { Duration } from '../constants';
import { getTimeInSeconds } from '../utils';

const accessTokenOptions = {
  expiresOn: getTimeInSeconds() + Duration.SECONDS.ONE_HOUR,
};

export { accessTokenOptions };
