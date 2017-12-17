import Joi from 'joi';

export default {
  addPost:{
    body:{
      category: Joi.string().required(),
      title: Joi.string().min(4).max(160).required().trim(),
      description: Joi.string().required(),
      tags: Joi.array(),
      fixedValue:Joi.number().min(1).required(),
      owner: Joi.object().required()
    }
  }
}