import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import newsCategoryController from "../controller/news-category-controller.js";

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

export { userRouter };
