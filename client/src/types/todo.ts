import { TodoStatus } from '../constants';
import { ValueOf } from './value-of';

type Todo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ValueOf<typeof TodoStatus>;
  title: string;
  description: string;
};

export type { Todo };
