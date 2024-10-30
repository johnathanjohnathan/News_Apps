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
  return user.id;
};

export const createToken = () => {
  const token = jwt.sign(
    { username: "test", email: "test@example.com" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return token;
};
