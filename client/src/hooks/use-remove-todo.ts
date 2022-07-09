import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { removeTodo } from '../core/api';
import { Error } from '../types';

const useRemoveTodo = (
  id: string,
  options?: UseMutationOptions<unknown, Error>,
) => {
  const mutation = useMutation<unknown, Error>({
    mutationKey: [MutationKey.REMOVE_TODO, id],
    mutationFn: () =>
      removeTodo(id)
        .either()
        .map((either) => either.map((response) => response.data))
        .map((either) =>
          either.fold(
            (data) => Promise.resolve(data),
            (error) => Promise.reject(error),
          ),
        )
        .run(),
    ...options,
  });

  return mutation;
};

export { useRemoveTodo };
