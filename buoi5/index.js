import express from "express"
import mongoose from "mongoose"
import { postController } from "./controller/post.controller.js"
import { userController } from "./controller/user.controller.js"
import { commentController } from "./controller/comment.controller.js"

const sv = express()
sv.use(express.json())

sv.use("/posts", postController);
sv.use("/users", userController);
sv.use('/comments', commentController);

mongoose.connect('mongodb://localhost:27017/buoi4').then(()=> sv.listen(3000,()=> console.log('server is running....!!!!')))