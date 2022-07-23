import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodo } from '../core/api';
import { ErrorResponse, SuccessResponse, Todo } from '../types';

const useGetTodo = (
  id: string,
  options?: UseQueryOptions<SuccessResponse<Todo>, ErrorResponse>,
) => {
  const query = useQuery<SuccessResponse<Todo>, ErrorResponse>({
    ...options,
    queryKey: [QueryKey.GET_TODO, id],
    queryFn: () =>
      getTodo
        .either()
        .map((either) => either.map((response) => response.data))
        .map((either) =>
          either.fold(
            (data) => Promise.resolve(data),
            (error) => Promise.reject(error),
          ),
        )
        .run(id),
  });

  return query;
};

export { useGetTodo };
