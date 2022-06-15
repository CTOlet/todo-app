import {
  QueryClient as QueryClientInstance,
  QueryCache,
  MutationCache,
} from 'react-query';
import { Toast } from './react-hot-toast';

const QueryClient = new QueryClientInstance({
  queryCache: new QueryCache({
    onError: (error) => {
      Toast.error(JSON.stringify(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      Toast.error(JSON.stringify(error));
    },
  }),
});

export { QueryClient };
