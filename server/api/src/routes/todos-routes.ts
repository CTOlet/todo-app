import express from 'express';
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  putTodo,
} from '../controllers';
import { verifyAuth } from '../middlewares';

const router = express.Router();

router.post('/', verifyAuth, postTodo);
router.get('/', verifyAuth, getTodos);
router.get('/:id', verifyAuth, getTodo);
router.put('/:id', verifyAuth, putTodo);
router.delete('/:id', verifyAuth, deleteTodo);

export { router as todosRoutes };
