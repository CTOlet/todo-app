import axios from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';

/**
 * Remove todo from server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const removeTodo = (id: string) =>
  IO.async(async () => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, `/todo/${id}`);
    return axios.delete(url);
  }).either();

export { removeTodo };
