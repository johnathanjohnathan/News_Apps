import { validate } from "../validation/validation.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  return result;
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );

  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

const logout = async (request) => {
  const username = validate(getUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Invalid credentials");
  }

  return prismaClient.user.update({
    data: {
      token: null,
    },
    where: {
      username: username,
    },
    select: {
      username: true,
    },
  });
};

export default { register, login, logout };
