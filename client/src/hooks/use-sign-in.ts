import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signIn } from '../core/api';
import { store } from '../services';
import { SuccessResponse, ErrorResponse, User } from '../types';

const useSignIn = (
  options?: UseMutationOptions<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse,
    Pick<User, 'username' | 'password'>
  >,
) => {
  const mutation = useMutation<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse,
    Pick<User, 'username' | 'password'>
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_IN],
    mutationFn: (user) =>
      signIn
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
