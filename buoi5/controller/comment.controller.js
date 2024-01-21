import express from "express"
import { postModel } from "../model/post.model.js"
import { commentModel } from "../model/comment.model.js";

const commentController = express.Router();
//4.Viết API cho phép user được comment vào bài post
commentController.post('/:postId', async (req, res) =>{
    try {
        const body = req.body;
        const  {postId}  = req.params;
        if(!body.content) throw new Error('invalid comemnts');
        if(!body.userId) throw new Error('pelase sign in to comment');
        await commentModel.create({
            postId : postId,
            userId : body.userId,
            content : body.content,
            createAt : new Date().toISOString()
        })
        res.status(201).send("Comment successfully!")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//5.Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
commentController.put('/:commentId', async (req, res) =>{
    try {
        const body = req.body;
        const  {commentId}  = req.params;
        if(!body.content) throw new Error('invalid comment data');
        if(!body.userId) throw new Error('pelase sign in to comment');
        if(!body.postId) throw new Error('Post may be removed');
        const checkUser = await commentModel.findById(commentId);
        if(checkUser.userId !== body.userId) throw new Error(`you can't eddit this comment.`)
        if(checkUser.userId === body.userId){
            checkUser.content = body.content;
            await checkUser.save()
            res.status(201).send("Comment has been edited successfully!")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//6.Viết API lấy tất cả comment của một bài post.
commentController.get('/:postId', async (req, res) =>{
    try {
        const postId = req.params.postId;
        const findPost = await commentModel.find({postId : postId});
        if(!findPost) throw new Error('This post is removed')
        const getAllcmt = findPost.map(item => item.content)
        res.status(200).send(getAllcmt)
    } catch (error) {
        res.status(500).send(error.message);
    }
})




export {commentController};