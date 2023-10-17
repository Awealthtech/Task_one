import * as Joi from '@hapi/joi';

export const CreateTodoValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  completed: Joi.boolean(),
});
