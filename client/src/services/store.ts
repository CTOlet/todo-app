import { Store } from 'pullstate';
import { isNil } from '../utils';

const store = new Store({
  version: '1.0.0',
  isHydrated: false,
});

// persisting store state
store.subscribe(
  (s) => s,
  (state) => {
    localStorage.setItem('@store', JSON.stringify(state));
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
    store.replace(state);
  }
} catch (e) {
  console.log('rehydrating store failed');
} finally {
  store.update((s) => {
    s.isHydrated = true;
  });
}

export { store };
