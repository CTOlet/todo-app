import { useMutation, UseMutationOptions } from 'react-query';
import { refresh } from '../../services/http';
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
    mutationFn: () =>
      refresh
        .map((r) => r.data)
        .forEach((r) => {
          const payload = decodeJWT<AccessTokenPayload>(r.data?.accessToken!);
          console.log(payload);
          // TODO: set timeout depending on access token expiration to refresh the tokens
        })
        .run(),

    onSuccess: () => {
      // TODO: signin again silently to get access token into signin hook
    },
  });

  return mutation;
};

export { _useRefresh };
