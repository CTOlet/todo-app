import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { updateTodo } from '../core/api';
import { Error, Todo } from '../types';

const useUpdateTodo = (
  todo: Todo,
  options?: UseMutationOptions<unknown, Error>,
) => {
  const mutation = useMutation<unknown, Error>({
    mutationKey: [MutationKey.UPDATE_TODO, todo],
    mutationFn: () =>
      updateTodo(todo)
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

export { useUpdateTodo };
