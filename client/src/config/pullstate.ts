import { Store as StoreInstance } from 'pullstate';
import { isNil } from '../utils';

const Store = new StoreInstance({
  version: '1.0.0',
  isHydrated: false,
});

// persisting store state
Store.subscribe(
  (s) => s,
  (state) => {
    localStorage.setItem('@Store', JSON.stringify(state));
  },
);

// rehydrating store state
try {
  Store.update((s) => {
    s.isHydrated = false;
  });
  const store = localStorage.getItem('@Store');
  if (!isNil(store)) {
    const state = JSON.parse(store);
    Store.replace(state);
  }
} catch (e) {
  console.log('rehydrating store failed');
} finally {
  Store.update((s) => {
    s.isHydrated = true;
  });
}

export { Store };
