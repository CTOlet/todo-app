import { useMutation, UseMutationOptions } from 'react-query';
import { signIn } from '../../adapters';
import { MutationKey } from '../../constants';
import { ResponseSuccess, ResponseError, User } from '../../types';

const _useSignIn = (
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
  });

  return mutation;
};

export { _useSignIn };
