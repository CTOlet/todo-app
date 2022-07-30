import { useMutation, UseMutationOptions } from 'react-query';
import { signOut } from '../../services/http';
import { MutationKey } from '../../constants';
import { ResponseSuccess, ResponseError } from '../../types';

const _useSignOut = (
  options?: UseMutationOptions<ResponseSuccess, ResponseError>,
) => {
  const mutation = useMutation<ResponseSuccess, ResponseError>({
    ...options,
    mutationKey: [MutationKey.SIGN_OUT],
    mutationFn: (user) => signOut.map((r) => r.data).run(user),
  });

  return mutation;
};

export { _useSignOut };
