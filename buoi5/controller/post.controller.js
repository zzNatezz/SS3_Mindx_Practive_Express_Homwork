import express from "express"
import { postModel } from "../model/post.model.js"
import { userModel } from "../model/user.model.js";
import { commentModel } from "../model/comment.model.js";

const postController = express.Router();
//3.Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
postController.put('/:postId', async (req, res) =>{
    try {
        const body = req.body;
        const  {postId}  = req.params;
        if(!body.content) throw new Error('invalid user name data');
        await postModel.updateOne({_id : postId},{content : body.content});
        res.status(201).send("updated successfully!")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//7.Viết API lấy tất cả các bài post, 3 comment đầu (dựa theo index) của tất cả user
postController.get('/', async (req, res) =>{
    try {
        const getAllPost = await postModel.find({}); console.log(getAllPost);
        const data = await Promise.all(
            getAllPost.map(async (post) =>{
                const user = await userModel.findById(post.userId);
                const GET_3_CMT = await commentModel.find({postId : post._id}).limit(3)
                return{
                    post : {
                        _id : post._id,
                        content : post.content,
                        user : user
                    },
                    threeComment : GET_3_CMT
                }
            })
        )
        res.status(200).send(data)
    } 
    catch (error) {
        res.status(500).send(error.message);
    }
})

//8.Viết API lấy một bài post và tất cả comment của bài post đó thông qua postId
postController.get('/:postId', async (req, res) =>{
    try {
        const postId = req.params.postId;
        const findPost = await postModel.findById(postId)
        if(!findPost) throw new Error('Post is deleted.')
        const findCmtAsPostId = await commentModel.find({postId : postId})
        res.status(200).send({
            post : findPost,
            allComment: findCmtAsPostId
        })
    } 
    catch (error) {
        res.status(500).send(error.message);
    }
})

export {postController};