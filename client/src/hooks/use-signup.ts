import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signUp } from '../core/api';
import { ResponseSuccess, ResponseError, User } from '../types';

const useSignUp = (
  options?: UseMutationOptions<
    ResponseSuccess,
    ResponseError,
    Pick<User, 'username' | 'password'>
  >,
) => {
  const mutation = useMutation<
    ResponseSuccess,
    ResponseError,
    Pick<User, 'username' | 'password'>
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_UP],
    mutationFn: (user) => signUp.map((r) => r.data).run(user),
  });

  return mutation;
};

export { useSignUp };
