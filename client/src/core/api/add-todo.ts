import axios, { AxiosResponse } from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { Error, Todo } from '../../types';

/**
 * Add todo to server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const addTodo = IO.async(
  async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/todo');
    return axios.post<
      never,
      AxiosResponse<unknown, Error>,
      Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
    >(url, todo);
  },
);

export { addTodo };
