import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { removeTodo } from '../core/api';
import { Error } from '../types';

const useRemoveTodo = (
  options?: UseMutationOptions<unknown, Error, string>,
) => {
  const mutation = useMutation<unknown, Error, string>({
    mutationKey: [MutationKey.REMOVE_TODO],
    mutationFn: (id: string) =>
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
