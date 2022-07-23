import express from 'express';
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  putTodo,
} from '../controllers';
import { authGuard } from '../middlewares';

const router = express.Router();

router.post('/', authGuard, postTodo);
router.get('/', authGuard, getTodos);
router.get('/:id', authGuard, getTodo);
router.put('/:id', authGuard, putTodo);
router.delete('/:id', authGuard, deleteTodo);

export { router as todosRoutes };
