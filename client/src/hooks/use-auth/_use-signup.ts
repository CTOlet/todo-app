import { UseMutationOptions, useMutation } from 'react-query';
import { signUp } from '../../adapters';
import { MutationKey } from '../../constants';
import { ResponseSuccess, ResponseError, User } from '../../types';

const _useSignUp = (
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

export { _useSignUp };
