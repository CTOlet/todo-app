import axios from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';

/**
 * Get all todos from server.
 *
 * @returns async io either axios response or throwable
 */
const getTodos = IO.async(async () => {
  const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/todos');
  return axios.post(url);
}).either();

export { getTodos };
