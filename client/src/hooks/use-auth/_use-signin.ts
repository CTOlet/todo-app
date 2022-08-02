import { useMutation, UseMutationOptions } from 'react-query';
import { signIn } from '../../api';
import { MutationKey } from '../../constants';
import { ResponseSuccess, ResponseError, User } from '../../types';

const _useSignIn = (
  options?: UseMutationOptions<
    ResponseSuccess<{ accessToken: string }>,
    ResponseError,
    Pick<User, 'username' | 'password'> | undefined
  >,
) => {
  const mutation = useMutation<
    ResponseSuccess<{ accessToken: string }>,
    ResponseError,
    Pick<User, 'username' | 'password'> | undefined
  >({
    ...options,
    mutationKey: [MutationKey.SIGN_IN],
    mutationFn: (user) => signIn.map((r) => r.data).run(user),
  });

  return mutation;
};

export { _useSignIn };
