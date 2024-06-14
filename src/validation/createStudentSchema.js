import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  age: Joi.number().integer().required().min(6).max(18),
  gender: Joi.string().required().valid('male', 'female'),
  avgMark: Joi.number().min(1).max(12),
  onDuty: Joi.boolean(),
});
