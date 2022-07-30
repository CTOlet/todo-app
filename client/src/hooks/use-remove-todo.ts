import { useMutation, UseMutationOptions } from 'react-query';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { removeTodo } from '../api';
import { ResponseSuccess, ResponseError, Todo } from '../types';

const useRemoveTodo = (
  options?: UseMutationOptions<ResponseSuccess, ResponseError, Todo>,
) => {
  const mutation = useMutation<
    ResponseSuccess,
    ResponseError,
    Todo,
    { previousState?: ResponseSuccess<Todo[]> }
  >({
    ...options,
    mutationKey: [MutationKey.REMOVE_TODO],
    mutationFn: (todo) => removeTodo.map((r) => r.data).run(todo),

    // optimistic update config
    onMutate: async (removeTodo) => {
      options?.onMutate?.(removeTodo);
      await queryClient.cancelQueries(QueryKey.GET_TODOS);
      const previousState = queryClient.getQueryData<ResponseSuccess<Todo[]>>(
        QueryKey.GET_TODOS,
      );
      queryClient.setQueryData<ResponseSuccess<Todo[]>>(
        QueryKey.GET_TODOS,
        (state) => {
          const todos = state?.data;
          return {
            ...state,
            data: todos?.filter((todo) => todo.id !== removeTodo.id) ?? [],
          } as ResponseSuccess<Todo[]>;
        },
      );
      return { previousState };
    },
    onError: (error, newTodo, context) => {
      options?.onError?.(error, newTodo, context);
      queryClient.setQueryData(QueryKey.GET_TODOS, context?.previousState);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
      queryClient.invalidateQueries(QueryKey.GET_TODOS);
    },
  });

  return mutation;
};

export { useRemoveTodo };
