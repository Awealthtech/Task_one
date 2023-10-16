import Joi from 'joi';

export const CreateUserDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  isVerified: Joi.boolean().required(),
  phoneNumber: Joi.number(),
}).options({
  abortEarly: false,
});
