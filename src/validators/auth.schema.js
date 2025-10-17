import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});
