import express from 'express';
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  putTodo,
} from '../controllers';

const router = express.Router();

router.post('/', postTodo);
router.get('/', getTodos);
router.get('/:id', getTodo);
router.put('/:id', putTodo);
router.delete('/:id', deleteTodo);

export { router as todosRoutes };
