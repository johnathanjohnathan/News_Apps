import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

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
