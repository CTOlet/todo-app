import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKey } from '../constants';
import { addTodo } from '../core/api';
import { Error, Todo } from '../types';

const useAddTodo = (
  todo: Omit<Todo, 'id'>,
  options?: UseMutationOptions<unknown, Error>,
) => {
  const mutation = useMutation<unknown, Error>({
    mutationKey: [MutationKey.ADD_TODO, todo],
    mutationFn: () =>
      addTodo(todo)
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

export { useAddTodo };
