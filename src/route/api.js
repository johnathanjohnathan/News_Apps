import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import newsCategoryController from "../controller/news-category-controller.js";
import newsController from "../controller/news-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.delete("/api/users/logout", userController.logout);

// News Category API
userRouter.post("/api/news-category/create", newsCategoryController.create);
userRouter.get("/api/news-category", newsCategoryController.get);
userRouter.put("/api/news-category/edit/:id", newsCategoryController.edit);
userRouter.delete(
  "/api/news-category/delete/:id",
  newsCategoryController.remove
);

// News API
userRouter.post("/api/news/create", newsController.create);
userRouter.put("/api/news/edit/:id", newsController.edit);
userRouter.delete("/api/news/delete/:id", newsController.remove);
userRouter.get("/api/news/all", newsController.getAll);
userRouter.get("/api/news/search", newsController.search);
userRouter.get("/api/news/:id", newsController.getDetail);

export { userRouter };
