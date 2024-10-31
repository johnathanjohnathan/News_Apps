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
  removeNews,
  createNews,
} from "./test-util.js";

describe("POST /api/news/create", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNews();
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should create new news", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .post("/api/news/create")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "test title",
        content: "test content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.title).toBe("test title");
    expect(result.body.data.content).toBe("test content");
    expect(result.body.data.categoryId).toBeDefined();
  });

  it("should reject if request is not valid", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .post("/api/news/create")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "",
        content: "",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if token is not valid", async () => {
    const token = "salah";
    const newsCategory = await createNewsCategory();

    const result = await supertest(web)
      .post("/api/news/create")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "test title",
        content: "test content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/news/edit/:id", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNews();
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should edit new news", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();
    const news = await createNews();

    const result = await supertest(web)
      .put(`/api/news/edit/${news.id}`)
      .set("Authorization", "Bearer " + token)
      .send({
        title: "test title",
        content: "test content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.title).toBe("test title");
    expect(result.body.data.content).toBe("test content");
    expect(result.body.data.categoryId).toBeDefined();
  });

  it("should reject if request is not valid", async () => {
    const token = createToken();
    const newsCategory = await createNewsCategory();
    const news = await createNews();

    const result = await supertest(web)
      .put(`/api/news/edit/${news.id}`)
      .set("Authorization", "Bearer " + token)
      .send({
        title: "",
        content: "",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if token is not valid", async () => {
    const token = "salah";
    const newsCategory = await createNewsCategory();
    const news = await createNews();

    const result = await supertest(web)
      .put(`/api/news/edit/${news.id}`)
      .set("Authorization", "Bearer " + token)
      .send({
        title: "test title",
        content: "test content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/news/delete/:id", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNews();
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should delete news", async () => {
    const token = createToken();
    const news = await createNews();

    const result = await supertest(web)
      .delete(`/api/news/delete/${news.id}`)
      .set("Authorization", "Bearer " + token);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });

  it("should reject delete news if id invalid", async () => {
    const token = createToken();
    const news = await createNews();

    const result = await supertest(web)
      .delete(`/api/news/delete/1`)
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/news", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNews();
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should get all news", async () => {
    const token = createToken();
    const news = await createNews();

    const result = await supertest(web)
      .get("/api/news")
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});

describe("GET /api/news/:id", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeNews();
    await removeNewsCategory();
    await removeTestUser();
  });
  it("should get news detail", async () => {
    const token = createToken();
    const news = await createNews();

    const result = await supertest(web)
      .get(`/api/news/${news.id}`)
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(200);
    expect(result.body.data.title).toBe("test title");
    expect(result.body.data.content).toBe("test content");
  });

  it("should reject get news detail if id invalid", async () => {
    const token = createToken();
    const news = await createNews();

    const result = await supertest(web)
      .get(`/api/news/1`)
      .set("Authorization", "Bearer " + token);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
