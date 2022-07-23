import { Store } from 'pullstate';
import { isNil } from '../utils';

type State = {
  version: string;
  isHydrated: boolean;
  isAuthenticated: boolean;
};

const store = new Store<State>({
  version: '1.0.0',
  isHydrated: false,
  isAuthenticated: false,
});

const persist: (keyof State)[] = ['version'];

// persisting store state
store.subscribe(
  (s) => s,
  (state) => {
    const persistState = Object.fromEntries(
      Object.entries(state).map(([key, value]) => {
        return persist.includes(key as keyof State) ? [key, value] : [];
      }),
    );
    localStorage.setItem('@store', JSON.stringify(persistState));
  },
);

// rehydrating store state
try {
  store.update((s) => {
    s.isHydrated = false;
  });
  const value = localStorage.getItem('@store');
  if (!isNil(value)) {
    const state = JSON.parse(value);
    store.update((s) => ({ ...s, ...state }));
  }
} catch (e) {
  console.log('rehydrating store failed');
} finally {
  store.update((s) => {
    s.isHydrated = true;
  });
}

export { store };
export type { State };
