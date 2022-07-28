import { useMutation, UseMutationOptions } from 'react-query';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { addTodo } from '../core/api';
import { ResponseError, ResponseSuccess, Todo } from '../types';

const useAddTodo = (
  options?: UseMutationOptions<
    ResponseSuccess,
    ResponseError,
    Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
  >,
) => {
  const mutation = useMutation<
    ResponseSuccess,
    ResponseError,
    Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>,
    { previousTodos?: Todo[] }
  >({
    ...options,
    mutationKey: [MutationKey.ADD_TODO],
    mutationFn: (todo) => addTodo.map((r) => r.data).run(todo),

    // optimistic update config
    onMutate: async (newTodo) => {
      options?.onMutate?.(newTodo);
      await queryClient.cancelQueries(QueryKey.GET_TODOS);
      const previousTodos = queryClient.getQueryData<Todo[]>(
        QueryKey.GET_TODOS,
      );
      queryClient.setQueryData<Todo[]>(QueryKey.GET_TODOS, (todos) => {
        return [newTodo as Todo, ...(todos ?? [])];
      });
      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      options?.onError?.(error, newTodo, context);
      queryClient.setQueryData(QueryKey.GET_TODOS, context?.previousTodos);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
      queryClient.invalidateQueries(QueryKey.GET_TODOS);
    },
  });

  return mutation;
};

export { useAddTodo };
