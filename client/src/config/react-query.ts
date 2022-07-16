import { QueryClient, QueryCache, MutationCache } from 'react-query';
import { toast } from 'react-hot-toast';
import { t } from 'i18next';
import { Error } from '../types';
import { AxiosError } from 'axios';

const errorHandler = (error: unknown) => {
  const customError = (error as AxiosError).response?.data as Error | undefined;
  if (customError) {
    toast.error(customError.message);
  } else {
    toast.error(t('error_message.unknown_error'));
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: errorHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorHandler,
  }),
});

export { queryClient };
