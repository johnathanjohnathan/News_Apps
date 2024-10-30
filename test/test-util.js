import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany();
};

export const createTestUser = async () => {
  const user = await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      role: "admin",
    },
  });
  return user;
};

export const createToken = () => {
  const token = jwt.sign(
    { username: "test", role: "admin" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );
  return token;
};

export const getTestUser = async () => {
  const user = await prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
  return user;
};

export const removeNewsCategory = async () => {
  await prismaClient.category.deleteMany();
};

export const createNewsCategory = async () => {
  const newsCategory = await prismaClient.category.create({
    data: {
      name: "test category",
      description: "test description",
    },
  });
  return newsCategory;
};

export const removeNews = async () => {
  await prismaClient.news.deleteMany();
};

export const createNews = async () => {
  const news = await prismaClient.news.create({
    data: {
      title: "test title",
      content: "test content",
      category: {
        create: {
          name: "new test category",
          description: "new test description",
        },
      },
      creator: {
        create: {
          username: "new test",
          password: await bcrypt.hash("rahasia", 10),
          role: "admin",
        },
      },
    },
  });
  return news;
};
