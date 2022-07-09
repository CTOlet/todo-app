import { QueryClient, QueryCache, MutationCache } from 'react-query';
import { toast } from 'react-hot-toast';
import { t } from 'i18next';
import { Error } from '../types';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(
        (error as Error)?.message ?? t('error_message.unknown_error'),
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(
        (error as Error)?.message ?? t('error_message.unknown_error'),
      );
    },
  }),
});

export { queryClient };
