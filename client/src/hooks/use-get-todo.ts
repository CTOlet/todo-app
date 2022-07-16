import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodo } from '../core/api';
import { Error, Todo } from '../types';

const useGetTodo = (id: string, options?: UseQueryOptions<Todo, Error>) => {
  const query = useQuery<Todo, Error>({
    ...options,
    queryKey: [QueryKey.GET_TODO, id],
    queryFn: () =>
      getTodo(id)
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

export { useGetTodo };
