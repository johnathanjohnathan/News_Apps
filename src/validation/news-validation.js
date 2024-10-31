import Joi from "joi";

const createNewsValidation = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().required(),
  categoryId: Joi.number().positive().required(),
  creatorId: Joi.number().positive().required(),
});

const editNewsValidation = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().max(100).required(),
  content: Joi.string().required(),
  categoryId: Joi.number().positive().required(),
  creatorId: Joi.number().positive().required(),
});

const removeNewsValidation = Joi.number().positive().required();

const getNewsDetailValidation = Joi.number().positive().required();

export {
  createNewsValidation,
  editNewsValidation,
  removeNewsValidation,
  getNewsDetailValidation,
};
