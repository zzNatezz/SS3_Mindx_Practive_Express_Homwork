import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { postController } from "./controller/post.controller.js";
import { userController } from "./controller/user.controller.js";
import { middlewareFactory } from "./middleware/middlewareFactory.js";
import { cmtController } from "./controller/comment.controller.js";
import { authenMiddleware } from "./middleware/authenMiddleware.js";

const sv = express();
sv.use(express.json());
sv.use(morgan("combined"));
sv.use(authenMiddleware)
sv.use("/posts", postController);
sv.use("/users", userController);
sv.use("/comments", cmtController);

mongoose
  .connect("mongodb://localhost:27017/buoi6")
  .then(() => sv.listen(3000, () => console.log("server is running !!!")));
