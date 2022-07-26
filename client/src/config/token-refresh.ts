import { refresh } from '../core/api';
import { store } from '../services';
import jwt from 'jsonwebtoken';

const configureTokenRefresh = () => {
  refresh
    .map((response) => response.data.data?.accessToken)
    .forEach((accessToken) => {
      store.update((state) => {
        state.accessToken = accessToken;
      });
    })
    .forEach((accessToken) => {
      // TODO: set timeout depending on access token expiration to refresh the tokens
    })
    .run();
};

export { configureTokenRefresh };
