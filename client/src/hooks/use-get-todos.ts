import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodos } from '../core/api';
import { Error, Todo } from '../types';

const useGetTodos = (options?: UseQueryOptions<Todo[], Error>) => {
  const query = useQuery<Todo[], Error>({
    queryKey: QueryKey.GET_TODOS,
    queryFn: () =>
      getTodos()
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

  return query;
};

getTodos()
  .either()
  .map((e) => e.map((r) => r.data))
  .map((e) => e.get());

export { useGetTodos };
