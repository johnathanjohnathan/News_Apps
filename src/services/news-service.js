import { validate } from "../validation/validation";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import {
  createNewsValidation,
  editNewsValidation,
} from "../validation/news-validation.js";

const create = async (user, request) => {
  const createNewsRequest = validate(createNewsValidation, request);

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const newNews = await prismaClient.news.create({
    data: createNewsRequest,
  });

  return newNews;
};

const edit = async (user, request) => {
  const editNewsRequest = validate(editNewsValidation, request);

  if (user.role !== "admin") {
    throw new ResponseError(401, "Unauthorized");
  }

  const editedNews = await prismaClient.news.update({
    data: editNewsRequest,
    where: {
      id: editNewsRequest.id,
    },
  });

  return editedNews;
};

export default { create, edit };
