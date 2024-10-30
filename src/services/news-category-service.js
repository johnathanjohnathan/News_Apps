import { validate } from "../validation/validation";
import {
  createNewsCategoryValidation,
  editNewsCategoryValidation,
  removeNewsCategoryValidation,
} from "../validation/news-category-validation";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";

const create = async (user, request) => {
  const newsCategory = validate(createNewsCategoryValidation, request);

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const newNewsCategory = await prismaClient.category.create({
    data: newsCategory,
  });

  return newNewsCategory;
};

const get = async (user, request) => {
  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const NewsCategory = await prismaClient.category.findMany();
  return NewsCategory;
};

const edit = async (user, request) => {
  console.log(request, "serviceee");
  const editNewsCategoryRequest = validate(editNewsCategoryValidation, request);

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const existNewsCategory = await prismaClient.category.findUnique({
    where: { id: editNewsCategoryRequest.id },
  });

  if (!existNewsCategory) {
    throw new ResponseError(404, "News Category not found");
  }

  const updatedNewsCategory = await prismaClient.category.update({
    where: { id: editNewsCategoryRequest.id },
    data: editNewsCategoryRequest,
  });

  return updatedNewsCategory;
};

const remove = async (user, request) => {
  const requestId = parseInt(request);
  const removeNewsCategoryRequest = validate(
    removeNewsCategoryValidation,
    requestId
  );

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const existNewsCategory = await prismaClient.category.findUnique({
    where: { id: removeNewsCategoryRequest },
  });

  if (!existNewsCategory) {
    throw new ResponseError(404, "News Category not found");
  }

  return await prismaClient.category.delete({
    where: { id: removeNewsCategoryRequest },
  });
};

export default { create, get, edit, remove };
