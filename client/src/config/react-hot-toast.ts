import { ToastOptions, toast } from 'react-hot-toast';

const Toast: typeof toast & { options?: ToastOptions } = toast;

Toast.options = {
  duration: 3000,
  position: 'top-right',
};

export { Toast };
