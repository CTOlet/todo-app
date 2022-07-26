import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodo } from '../core/api';
import { ResponseError, ResponseSuccess, Todo } from '../types';

const useGetTodo = (
  id: string,
  options?: UseQueryOptions<ResponseSuccess<Todo>, ResponseError>,
) => {
  const query = useQuery<ResponseSuccess<Todo>, ResponseError>({
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
