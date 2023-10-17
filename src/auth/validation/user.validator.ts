import * as Joi from 'joi';

export const CreateUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.number(),
}).options({
  abortEarly: false,
});
