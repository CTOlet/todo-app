import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signIn } from '../core/api';
import { store } from '../services';
import { ResponseError, ResponseSuccess, User } from '../types';

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
    mutationFn: (user) =>
      signIn
        .forEach((response) => {
          store.update((state) => {
            state.accessToken = response.data.data?.accessToken;
          });
        })
        .either()
        .map((either) => either.map((response) => response.data))
        .map((either) =>
          either.fold(
            (data) => Promise.resolve(data),
            (error) => Promise.reject(error),
          ),
        )
        .run(user),
  });

  return mutation;
};

export { useSignIn };
