import Joi from 'joi';

export const passwordReg =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
  register:{
    body:{
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
      fullName: Joi.string().required(),
    },
  },
  perfil:{
    body:{
      fullName:Joi.string().required(),
      avatar: Joi.string().required(),
      biography: Joi.string().required(),
      skills: Joi.string().required(),
      country: Joi.string().required()
    },
  },
};