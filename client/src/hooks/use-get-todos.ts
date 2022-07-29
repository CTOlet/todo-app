import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodos } from '../adapters';
import { ResponseSuccess, ResponseError, Todo } from '../types';

const useGetTodos = (
  options?: UseQueryOptions<ResponseSuccess<Todo[]>, ResponseError>,
) => {
  const query = useQuery<ResponseSuccess<Todo[]>, ResponseError>({
    ...options,
    queryKey: QueryKey.GET_TODOS,
    queryFn: () => getTodos.map((r) => r.data).run(),
  });

  return query;
};

export { useGetTodos };
