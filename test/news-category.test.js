import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestUser,
  createToken,
  getTestUser,
  removeTestUser,
  removeNewsCategory,
  createNewsCategory,
} from "./test-util.js";

describe("POST /api/news-category/create", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should create new news category", async () => {
    const token = createToken();

    const result = await supertest(web)
      .post("/api/news-category/create")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "test category",
        description: "test description",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe("test category");
    expect(result.body.data.description).toBe("test description");
  });

  it("should reject if request is not valid", async () => {
    const token = createToken();

    const result = await supertest(web)
      .post("/api/news-category/create")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "",
        description: "",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if token is not valid", async () => {
    const token = "salah";

    const result = await supertest(web)
      .post("/api/news-category/create")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "",
        description: "",
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/news-category", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should get all news category", async () => {
    const token = createToken();

    const result = await supertest(web)
      .get("/api/news-category")
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});

describe("PUT /api/news-category/edit/:id", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should edit news category", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .put(`/api/news-category/edit/${newsCategory.id}`)
      .set("Authorization", "Bearer " + token)
      .send({
        name: "edit category",
        description: "edit description",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("edit category");
    expect(result.body.data.description).toBe("edit description");
  });

  it("should reject edit news category if data invalid", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .put(`/api/news-category/edit/${newsCategory.id}`)
      .set("Authorization", "Bearer " + token)
      .send({
        name: "",
        description: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/news-category/delete/:id", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should delete news category", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .delete(`/api/news-category/delete/${newsCategory.id}`)
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });

  it("should reject delete news category if id invalid", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .delete(`/api/news-category/delete/1`)
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
