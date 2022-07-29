import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKey } from '../constants';
import { getTodo } from '../adapters';
import { ResponseError, ResponseSuccess, Todo } from '../types';

const useGetTodo = (
  id: string,
  options?: UseQueryOptions<ResponseSuccess<Todo>, ResponseError>,
) => {
  const query = useQuery<ResponseSuccess<Todo>, ResponseError>({
    ...options,
    queryKey: [QueryKey.GET_TODO, id],
    queryFn: () => getTodo.map((r) => r.data).run(id),
  });

  return query;
};

export { useGetTodo };
