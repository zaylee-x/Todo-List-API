import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { createTodoSchema, updateTodoSchema } from '../validators/todo.schema.js';
import {
  createTodo, getTodos, getTodoById, updateTodo, deleteTodo, deleteAllTodos
} from '../controllers/todo.controller.js';

const router = Router();
router.use(authRequired);

router.get('/', getTodos);
router.post('/', validate(createTodoSchema), createTodo);
router.delete('/', deleteAllTodos);

router.get('/:id', getTodoById);
router.patch('/:id', validate(updateTodoSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;
