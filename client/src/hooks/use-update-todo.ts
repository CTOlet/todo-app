import { useMutation, UseMutationOptions } from 'react-query';
import { replaceAt } from '../utils';
import { queryClient } from '../config/react-query';
import { MutationKey, QueryKey } from '../constants';
import { updateTodo } from '../services/http';
import { ResponseSuccess, ResponseError, Todo } from '../types';

const useUpdateTodo = (
  options?: UseMutationOptions<ResponseSuccess, ResponseError, Todo>,
) => {
  const mutation = useMutation<
    ResponseSuccess,
    ResponseError,
    Todo,
    { previousState?: ResponseSuccess<Todo[]> }
  >({
    ...options,
    mutationKey: [MutationKey.UPDATE_TODO],
    mutationFn: (todo) => updateTodo.map((r) => r.data).run(todo),

    // optimistic update config
    onMutate: async (newTodo) => {
      options?.onMutate?.(newTodo);
      await queryClient.cancelQueries(QueryKey.GET_TODOS);
      const previousState = queryClient.getQueryData<ResponseSuccess<Todo[]>>(
        QueryKey.GET_TODOS,
      );
      queryClient.setQueryData<ResponseSuccess<Todo[]>>(
        QueryKey.GET_TODOS,
        (state) => {
          const todos = state?.data;
          const index = todos?.findIndex((todo) => todo.id === newTodo.id);
          return {
            ...state,
            data: replaceAt(todos!, index!, newTodo),
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

export { useUpdateTodo };
