import express from 'express'
import { validateAuthorUser, validateCreatePost, validateRmvPost, validateUpdatePost } from '../middleware/postMiddle/post.Middleware.js';
import { postModel } from '../model/post.model.js';
import asyncHanlder from "express-async-handler"


const postController = express.Router();

// *    + POST /posts thì yêu cầu đủ trường của model post
postController.post('/', validateCreatePost,asyncHanlder( async(req, res) =>{
    const body = req.body
    const createPost = await postModel.create({
        content : body.content,
        userId : req.user._id,
        createdAt : new Date().toISOString()
    })
    res.status(200).send({
        data: createPost,
        status : 'Succesfull',
        mes: `Post has been created`
    })
}))
postController.get('/', asyncHanlder(async(req, res) =>{
    const findAllPost = await postModel.find({})
    res.status(200).send({
        data: findAllPost,
        status : 'Succesfull',
        mes: `Posts are shown`
    })
}))

// *    + PUT /posts/:postId thì yêu cầu user là người tạo post và đủ trường của model post
postController.put('/:postId',validateUpdatePost, asyncHanlder( async (req, res) =>{
    const findPost = await postModel.findById(req.params.postId)
    findPost.content = req.body.content;
    findPost.updatedAt = new Date().toISOString();
    findPost.save()
    res.status(201).send({
        data: findPost,
        status : 'Succesfull',
        mes: `Post is updated`
    })
}))
//+ DELETE /posts/:postId thì yêu cầu user là người tạo post
postController.delete('/:postId', validateRmvPost, asyncHanlder( async (req, res) =>{
    await postModel.findByIdAndDelete(req.params.postId);
    res.status(201).send({
        status : 'Succesfull',
        mes: `Post has been removed`
    })
}))

// GET /posts/:postId thì yêu cầu req.user._id == post.userId (chỉ user tạo post mới xem được post)
postController.get('/:postId',validateAuthorUser, asyncHanlder(async(req, res) =>{
    const getPost = await postModel.findById(req.params.postId)
    res.status(200).send({
        data : getPost,
        status : 'Succesfully',
        mes : "this post is being shown"
    })

}))

export {postController};