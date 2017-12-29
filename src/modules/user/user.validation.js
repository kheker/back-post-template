import Joi from 'joi';
import HTTPStatus from 'http-status';

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export const validateUserJoi = (Schemas) => (req, res, next) => {
  const result = Joi.validate(req.body, Schemas)
  if (result.error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(result.error);
  }
  if (!req.value) { req.value = {}; }
  req.value.body = result.value;
  return next();
};

export const Schemas = {
  singInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordReg).required(),
    fullName: Joi.string().required(),
  }),
  updateUserSchema: Joi.object().keys({
    fullName: Joi.string().required(),
    avatar: Joi.string().required(),
    biography: Joi.string().required(),
    skills: Joi.array().required(),
    country: Joi.string().required()
  })
};
