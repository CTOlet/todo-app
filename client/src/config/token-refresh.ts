import { refresh } from '../core/api';
import { store } from '../services';
import { decodeJWT } from '../utils';
import { AccessTokenPayload } from '../types/access-token';

const configureTokenRefresh = () => {
  refresh
    .either()
    .map((either) =>
      either.forEach((r) => {
        store.update((s) => {
          s.accessToken = r.data.data?.accessToken;
          s.isAuthenticated = 'SUCCESS';
        });
      }),
    )
    .map((either) => either.swap())
    .map((either) =>
      either.forEach((l) => {
        store.update((s) => {
          s.accessToken = undefined;
          s.isAuthenticated = 'ERROR';
        });
      }),
    )
    .map((either) => either.swap())
    .map((either) => {
      either.forEach((r) => {
        const payload = decodeJWT<AccessTokenPayload>(
          r.data.data?.accessToken!,
        );
        console.log(payload);
        // TODO: set timeout depending on access token expiration to refresh the tokens
      });
    })
    .run();
};

export { configureTokenRefresh };
