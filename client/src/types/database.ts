import { TodoStatus } from '../constants';
import { ValueOf } from './helper';

type Todo = {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  status: ValueOf<typeof TodoStatus>;
  title: string;
  description: string;
};

type User = {
  id: string;
  createdAt: number;
  updatedAt: number;
  username: string;
};

export type { Todo, User };
