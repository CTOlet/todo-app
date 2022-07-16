import { TodoStatus } from '../constants';
import { ValueOf } from './value-of';

type Todo = {
  id: string;
  created_at: string;
  status: ValueOf<typeof TodoStatus>;
  title: string;
  description: string;
};

export type { Todo };
