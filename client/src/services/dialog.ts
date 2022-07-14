import { ReactNode } from 'react';
import { DialogType } from '../constants';

type DialogElement = {
  type: keyof typeof DialogType | string;
  element: ReactNode;
  actions?: {
    confirm?: { label?: string; onClick?: () => void };
    cancel?: { label?: string; onClick?: () => void };
  };
  closeOnAction?: boolean;
};

const Dialog = () => {
  let dialogs: DialogElement[] = [];
  let subscriptions: ((dialogs: DialogElement[]) => void)[] = [];

  const api = {
    warn: (options: Omit<DialogElement, 'type'>) => {
      dialogs = [
        ...dialogs,
        { closeOnAction: true, ...options, type: DialogType.WARN },
      ];
      subscriptions.forEach((subscriber) => subscriber(dialogs));
      return dialogs;
    },
    info: (options: Omit<DialogElement, 'type'>) => {
      dialogs = [
        ...dialogs,
        { closeOnAction: true, ...options, type: DialogType.INFO },
      ];
      subscriptions.forEach((subscriber) => subscriber(dialogs));
      return dialogs;
    },
    open: (options: Omit<DialogElement, 'type' | 'actions'>) => {
      dialogs = [
        ...dialogs,
        { closeOnAction: true, ...options, type: DialogType.CUSTOM },
      ];
      subscriptions.forEach((subscriber) => subscriber(dialogs));
      return dialogs;
    },
    close: (dialog?: DialogElement) => {
      if (dialog) {
        const index = dialogs.indexOf(dialog);
        api.closeAt(index);
      } else {
        api.closeAt(dialogs.length - 1);
      }
    },
    closeAt: (index: number) => {
      dialogs = dialogs.filter((_, i) => i !== index);
      subscriptions.forEach((subscriber) => subscriber(dialogs));
      return dialogs;
    },
    getAll: () => {
      return dialogs;
    },
    getAt: (index: number) => {
      return dialogs[index];
    },
    subscribe: (subscriber: (dialogs: DialogElement[]) => void) => {
      subscriptions = [...subscriptions, subscriber];
      const index = subscriptions.indexOf(subscriber);
      return () => {
        subscriptions = subscriptions.filter((_, i) => i !== index);
      };
    },
  };

  return api;
};

const dialog = Dialog();

export { dialog };
export type { DialogElement };
