type User = {
  id: string;
  createdAt: number;
  updatedAt: number;
  username: string;
  password: string;
};

type Todo = {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  status: string;
  title: string;
  description: string;
};

type Token = {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  token: string;
  expiresOn: number;
};

export type { User, Todo, Token };
