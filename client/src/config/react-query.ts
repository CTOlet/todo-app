import { QueryClient, QueryCache, MutationCache } from 'react-query';
import { toast } from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(JSON.stringify(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(JSON.stringify(error));
    },
  }),
});

export { queryClient };
