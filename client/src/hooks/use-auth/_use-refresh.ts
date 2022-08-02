import { useMutation, UseMutationOptions } from 'react-query';
import { refresh } from '../../api';
import { MutationKey } from '../../constants';
import { SuccessResponse, ErrorResponse } from '../../types';

const _useRefresh = (
  options?: UseMutationOptions<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse
  >,
) => {
  const mutation = useMutation<
    SuccessResponse<{ accessToken: string }>,
    ErrorResponse
  >({
    ...options,
    mutationKey: [MutationKey.REFRESH],
    mutationFn: () => refresh.map((r) => r.data).run(),
  });

  return mutation;
};

export { _useRefresh };
