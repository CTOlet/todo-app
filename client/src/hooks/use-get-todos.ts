import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodos } from '../core/api';
import { SuccessResponse, ErrorResponse, Todo } from '../types';

const useGetTodos = (
  options?: UseQueryOptions<SuccessResponse<Todo[]>, ErrorResponse>,
) => {
  const query = useQuery<SuccessResponse<Todo[]>, ErrorResponse>({
    ...options,
    queryKey: QueryKey.GET_TODOS,
    queryFn: () =>
      getTodos
        .either()
        .map((either) => either.map((response) => response.data))
        .map((either) =>
          either.fold(
            (data) => Promise.resolve(data),
            (error) => Promise.reject(error),
          ),
        )
        .run(),
  });

  return query;
};

export { useGetTodos };
