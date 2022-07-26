import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { signOut } from '../core/api';
import { ResponseSuccess, ResponseError } from '../types';

const useSignOut = (
  options?: UseMutationOptions<ResponseSuccess, ResponseError>,
) => {
  const mutation = useMutation<ResponseSuccess, ResponseError>({
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
