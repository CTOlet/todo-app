import express from 'express';
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  putTodo,
} from '../controllers';
import { checkAuth } from '../middlewares';

const router = express.Router();

router.post('/', checkAuth, postTodo);
router.get('/', checkAuth, getTodos);
router.get('/:id', checkAuth, getTodo);
router.put('/:id', checkAuth, putTodo);
router.delete('/:id', checkAuth, deleteTodo);

export { router as todosRoutes };
