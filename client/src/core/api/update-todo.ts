import axios, { AxiosResponse } from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { Error, Todo } from '../../types';

/**
 * Update todo on server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const updateTodo = ({ id, ...rest }: Todo) =>
  IO.async(async () => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todo/${id}`);
    return axios.put<never, AxiosResponse<unknown, Error>, Omit<Todo, 'id'>>(
      url,
      rest,
    );
  });

export { updateTodo };
