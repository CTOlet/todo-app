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
const updateTodo = IO.async(async (todo: Todo) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todo/${todo.id}`);
  return axios.put<never, AxiosResponse<unknown, Error>, Todo>(url, todo);
});

export { updateTodo };
