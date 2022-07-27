import { Store } from 'pullstate';
import { AccessTokenPayload } from '../types/access-token';

type State = {
  version: string;
  isAuthenticated: 'SUCCESS' | 'ERROR' | 'PENDING';
  accessToken?: string;
};

const store = new Store<State>({
  version: '1.0.0',
  isAuthenticated: 'PENDING',
  accessToken: undefined,
});

export { store };
export type { State };
