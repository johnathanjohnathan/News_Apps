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
        title: "Test Title",
        content: "Test Content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.title).toBe("Test Title");
    expect(result.body.data.content).toBe("Test Content");
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
        title: "Test Title",
        content: "Test Content",
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
        title: "Test Title",
        content: "Test Content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.title).toBe("Test Title");
    expect(result.body.data.content).toBe("Test Content");
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
        title: "Test Title",
        content: "Test Content",
        categoryId: newsCategory.id,
      });
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
