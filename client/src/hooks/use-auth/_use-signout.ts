import { useMutation, UseMutationOptions } from 'react-query';
import { signOut } from '../../api';
import { MutationKey } from '../../constants';
import { SuccessResponse, ErrorResponse } from '../../types';

const _useSignOut = (
  options?: UseMutationOptions<SuccessResponse, ErrorResponse>,
) => {
  const mutation = useMutation<SuccessResponse, ErrorResponse>({
    ...options,
    mutationKey: [MutationKey.SIGN_OUT],
    mutationFn: (user) => signOut.map((r) => r.data).run(user),
  });

  return mutation;
};

export { _useSignOut };
