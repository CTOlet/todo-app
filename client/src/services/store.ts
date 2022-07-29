import { Store } from 'pullstate';

type State = {
  version: string;
};

const store = new Store<State>({
  version: '1.0.0',
});

export { store };
export type { State };
