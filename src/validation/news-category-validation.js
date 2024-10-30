import Joi from "joi";

const createNewsCategoryValidation = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().required(),
});

const removeNewsCategoryValidation = Joi.number().positive().required();

const editNewsCategoryValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().required(),
});

export {
  createNewsCategoryValidation,
  removeNewsCategoryValidation,
  editNewsCategoryValidation,
};
