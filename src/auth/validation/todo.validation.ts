import * as Joi from '@hapi/joi';

export const CreateTodoValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  completed: Joi.boolean(),
});

export const UpdateTodoValidator = Joi.object({
  title: Joi.string().trim().allow(null),
  description: Joi.string().allow(null),
  completed: Joi.boolean().allow(null),
});
