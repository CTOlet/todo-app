import { useMutation, UseMutationOptions } from 'react-query';
import { replaceAt } from '../utils';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { updateTodo } from '../core/api';
import { ResponseSuccess, ResponseError, Todo } from '../types';

const useUpdateTodo = (
  options?: UseMutationOptions<ResponseSuccess, ResponseError, Todo>,
) => {
  const mutation = useMutation<
    ResponseSuccess,
    ResponseError,
    Todo,
    { previousTodos?: Todo[] }
  >({
    ...options,
    mutationKey: [MutationKey.UPDATE_TODO],
    mutationFn: (todo) => updateTodo.map((r) => r.data).run(todo),

    // optimistic update config
    onMutate: async (newTodo) => {
      options?.onMutate?.(newTodo);
      await queryClient.cancelQueries(QueryKey.GET_TODOS);
      const previousTodos = queryClient.getQueryData<Todo[]>(
        QueryKey.GET_TODOS,
      );
      queryClient.setQueryData<Todo[]>(QueryKey.GET_TODOS, (todos) => {
        const index = todos?.findIndex((todo) => todo.id === newTodo.id);
        return replaceAt(todos!, index!, newTodo);
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

export { useUpdateTodo };
