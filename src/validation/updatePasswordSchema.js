import Joi from 'joi';

export const updatePasswordSchema = Joi.object({
  password: Joi.string().required().min(5).max(20),
});
