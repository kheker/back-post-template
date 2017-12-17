import Joi from 'joi';

export const passwordReg =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
  register:{
    body:{
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
    },
  },
};