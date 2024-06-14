import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(20).messages({
    // 'any.required': 'Is required!',
    'string.base': 'name: Must be a string',
    'string.min': 'Min string length is not achived. {{#limit}} is required',
    'string.max': 'Max string length is not achived. {{#limit}} is required',
  }),
  age: Joi.number().integer().required().min(6).max(18).messages({
    'number.base': 'age: Must be a number',
    'number.min': 'Min number is not achived. {{#limit}} is required',
    'number.max': 'Max number is not achived. {{#limit}} is required',
  }),
  gender: Joi.string().required().valid('male', 'female'),
  avgMark: Joi.number().min(1).max(12).messages({
    'number.base': 'avgMark: Must be a number',
    'number.min': 'Min number is not achived. {{#limit}} is required',
    'number.max': 'Max number is not achived. {{#limit}} is required',
  }),
  onDuty: Joi.boolean(),
});
