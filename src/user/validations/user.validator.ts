import * as Joi from 'joi';

export const CreateUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/),
});

export const LoginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
