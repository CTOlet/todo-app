import { refresh } from '../core/api';
import { store } from '../services';
import { decodeJWT } from '../utils';
import { AccessTokenPayload } from '../types/access-token';

const configureTokenRefresh = () => {
  refresh
    .map((response) => response.data.data?.accessToken)
    .forEach((accessToken) => {
      store.update((state) => {
        state.accessToken = accessToken;
      });
    })
    .forEach((accessToken) => {
      const payload = decodeJWT<AccessTokenPayload>(accessToken!);
      console.log(payload);
      // TODO: set timeout depending on access token expiration to refresh the tokens
    })
    .run();
};

export { configureTokenRefresh };
