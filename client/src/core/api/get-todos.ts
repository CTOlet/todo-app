import axios from 'axios';
import urlcat from 'urlcat';
import { Either, IO } from 'moneo-ts';
import { handleAxiosError } from '../../utils';

/**
 * Get all todos from server.
 *
 * @returns async io either axios response or axios error
 */
const getTodos = IO.async(async () => {
  const url = urlcat(import.meta.env.BASE_URL, '/todos');
  return axios
    .post(url)
    .then(Either.right)
    .catch(handleAxiosError(Either.left));
});

export { getTodos };
