import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
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
    { username: "test", roloe: "admin" },
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
      name: "Test Category",
      description: "Test Description",
    },
  });
  return newsCategory;
};
