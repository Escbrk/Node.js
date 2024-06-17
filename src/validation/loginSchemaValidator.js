import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(5).max(20),
});
