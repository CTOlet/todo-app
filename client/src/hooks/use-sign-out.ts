import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signOut } from '../core/api';
import { SuccessResponse, ErrorResponse } from '../types';

const useSignOut = (
  options?: UseMutationOptions<SuccessResponse, ErrorResponse>,
) => {
  const mutation = useMutation<SuccessResponse, ErrorResponse>({
    ...options,
    mutationKey: [MutationKey.SIGN_OUT],
    mutationFn: (user) =>
      signOut
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

export { useSignOut };
