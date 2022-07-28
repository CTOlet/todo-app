import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signOut } from '../core/api';
import { store } from '../services';
import { ResponseSuccess, ResponseError } from '../types';

const useSignOut = (
  options?: UseMutationOptions<ResponseSuccess, ResponseError>,
) => {
  const mutation = useMutation<ResponseSuccess, ResponseError>({
    ...options,
    mutationKey: [MutationKey.SIGN_OUT],
    mutationFn: (user) => signOut.map((r) => r.data).run(user),

    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
      store.update((s) => {
        s.accessToken = undefined;
        s.isAuthenticated = 'ERROR';
      });
    },
  });

  return mutation;
};

export { useSignOut };
