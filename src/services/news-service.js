import { validate } from "../validation/validation";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import {
  createNewsValidation,
  editNewsValidation,
  removeNewsValidation,
} from "../validation/news-validation.js";

const create = async (user, request) => {
  const createNewsRequest = validate(createNewsValidation, request);

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const existNews = await prismaClient.news.findFirst({
    where: { title: createNewsRequest.title },
  });

  if (existNews) {
    throw new ResponseError(400, "News with the same title already exists");
  }

  const newNews = await prismaClient.news.create({
    data: createNewsRequest,
  });

  return newNews;
};

const edit = async (user, request) => {
  const editNewsRequest = validate(editNewsValidation, request);

  console.log(editNewsRequest, "newsssssssssssssss");

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const existNews = await prismaClient.news.findFirst({
    where: { title: editNewsRequest.title },
  });

  console.log(existNews, "newsssssssssssssss");

  if (!existNews) {
    throw new ResponseError(
      404,
      "News with the same title already does not exists"
    );
  }

  const editedNews = await prismaClient.news.update({
    data: editNewsRequest,
    where: {
      id: editNewsRequest.id,
    },
  });

  return editedNews;
};

const remove = async (user, request) => {
  const removeNewsRequest = validate(removeNewsValidation, request);

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const existNews = await prismaClient.news.findFirst({
    where: { id: removeNewsRequest },
  });

  if (!existNews) {
    throw new ResponseError(
      404,
      "News with the same title already does not exists"
    );
  }

  return await prismaClient.news.delete({
    where: { id: removeNewsRequest },
  });
};

export default { create, edit, remove };
