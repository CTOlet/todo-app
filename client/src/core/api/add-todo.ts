import axios from 'axios';
import urlcat from 'urlcat';
import { IO } from 'moneo-ts';
import { Todo } from '../../types';

/**
 * Add todo to server.
 *
 * @param todo
 * @returns async io either axios response or throwable
 */
const addTodo = (todo: Omit<Todo, 'id'>) =>
  IO.async(async () => {
    const url = urlcat(import.meta.env.VITE_API_BASE_URL, '/todo');
    return axios.post(url, todo);
  }).either();

export { addTodo };
