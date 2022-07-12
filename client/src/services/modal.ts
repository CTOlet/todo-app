import { ReactNode, useEffect, useReducer } from 'react';

type ModalOptions = { content: ReactNode; actions?: ReactNode };

const Modal = () => {
  let modals: ModalOptions[] = [];
  let subscriptions: ((modals: ModalOptions[]) => void)[] = [];

  const api = {
    open: (modal: ModalOptions) => {
      modals = [...modals, modal];
      subscriptions.forEach((subscriber) => subscriber(modals));
      return modals;
    },
    close: (modal?: ModalOptions) => {
      if (modal) {
        const index = modals.indexOf(modal);
        api.closeAt(index);
      } else {
        api.closeAt(modals.length - 1);
      }
    },
    closeAt: (index: number) => {
      modals = modals.filter((_, i) => i !== index);
      subscriptions.forEach((subscriber) => subscriber(modals));
      return modals;
    },
    getAll: () => {
      return modals;
    },
    getAt: (index: number) => {
      return modals[index];
    },
    subscribe: (subscriber: (modals: ModalOptions[]) => void) => {
      subscriptions = [...subscriptions, subscriber];
      const index = subscriptions.indexOf(subscriber);
      return () => {
        subscriptions = subscriptions.filter((_, i) => i !== index);
      };
    },
  };

  return api;
};

const modal = Modal();

const useModal = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = modal.subscribe(forceUpdate);
    return () => {
      unsubscribe();
    };
  }, []);

  return modal;
};

export { modal, useModal };
