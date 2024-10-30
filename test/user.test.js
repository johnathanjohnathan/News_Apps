import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestUser,
  createToken,
  getTestUser,
  removeTestUser,
} from "./test-util.js";
import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users/signup", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users/signup").send({
      username: "test",
      password: "rahasia",
      role: "admin",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.role).toBe("admin");
    expect(result.body.data.id).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/signup").send({
      username: "",
      password: "",
      role: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already registered", async () => {
    await createTestUser();
    let result = await supertest(web).post("/api/users/signup").send({
      username: "test",
      password: "rahasia",
      role: "admin",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });

  it("should reject login if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can logout", async () => {
    const token = createToken();
    await prismaClient.user.update({
      data: {
        token: token,
      },
      where: {
        username: "test",
      },
    });
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(200);

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it("should can logout", async () => {
    const token = createToken();
    await prismaClient.user.update({
      data: {
        token: token,
      },
      where: {
        username: "test",
      },
    });
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(200);

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });
});
