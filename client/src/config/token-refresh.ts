import { refresh } from '../core/api';
import { store } from '../services';

const configureTokenRefresh = () => {
  refresh
    .map((response) => response.data.data?.accessToken)
    .forEach((accessToken) => {
      store.update((state) => {
        state.accessToken = accessToken;
      });
    })
    .forEach(() => {
      // TODO: set timeout for refresh token refresh
    })
    .run();
};

export { configureTokenRefresh };
