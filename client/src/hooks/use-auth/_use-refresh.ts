import { useMutation, UseMutationOptions } from 'react-query';
import { refresh } from '../../api';
import { MutationKey } from '../../constants';
import { ResponseSuccess, ResponseError } from '../../types';
import { AccessTokenPayload } from '../../types/access-token';
import { decodeJWT } from '../../utils';

const _useRefresh = (
  options?: UseMutationOptions<
    ResponseSuccess<{ accessToken: string }>,
    ResponseError
  >,
) => {
  const mutation = useMutation<
    ResponseSuccess<{ accessToken: string }>,
    ResponseError
  >({
    ...options,
    mutationKey: [MutationKey.REFRESH],
    mutationFn: () => refresh.map((r) => r.data).run(),
  });

  return mutation;
};

export { _useRefresh };
