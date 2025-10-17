import Joi from 'joi';

export const createTodoSchema = Joi.object({
  title: Joi.string().min(1).max(140).required(),
  description: Joi.string().max(2000).allow(''),
  status: Joi.string().valid('todo', 'in_progress', 'done').default('todo'),
  dueDate: Joi.date().optional()
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(1).max(140),
  description: Joi.string().max(2000).allow(''),
  status: Joi.string().valid('todo', 'in_progress', 'done'),
  dueDate: Joi.date().optional()
}).min(1);
