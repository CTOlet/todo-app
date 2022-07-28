import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signIn } from '../core/api';
import { store } from '../services';
import { ResponseError, ResponseSuccess, User } from '../types';
import { ioToPromise } from '../utils';

const useSignIn = (
  options?: UseMutationOptions<
    ResponseSuccess<{ accessToken: string }>,
    ResponseError,
    Pick<User, 'username' | 'password'>
  >,
) => {
  const mutation = useMutation<
    ResponseSuccess<{ accessToken: string }>,
    ResponseError,
    Pick<User, 'username' | 'password'>
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_IN],
    mutationFn: (user) => signIn.map((r) => r.data).run(user),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      store.update((s) => {
        s.accessToken = data.data?.accessToken;
        s.isAuthenticated = 'SUCCESS';
      });
    },
    onError: (error, variables, context) => {
      options?.onSuccess?.(error, variables, context);
      store.update((s) => {
        s.accessToken = undefined;
        s.isAuthenticated = 'ERROR';
      });
    },
  });

  return mutation;
};

export { useSignIn };
