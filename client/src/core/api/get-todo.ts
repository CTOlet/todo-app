import axios, { AxiosResponse } from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { Error, Todo } from '../../types';

/**
 * Get todo from server.
 *
 * @param id
 * @returns async io either axios response or throwable
 */
const getTodo = IO.async(async (id: string) => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todo/${id}`);
  return axios.get<never, AxiosResponse<Todo, Error>>(url);
});

export { getTodo };
