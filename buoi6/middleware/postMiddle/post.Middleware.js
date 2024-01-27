import { isObjectIdOrHexString } from "mongoose"
import asyncHandler from "express-async-handler"
import { postModel } from "../../model/post.model.js";

const validateCreatePost = asyncHandler(
    async (req, res, next) =>{
        if(!req.body.content) throw new Error(`can not post empty post`);
        if(!req.user.roles.includes('user') || !req.user.roles ) throw new Error(`you can't create the post, please contact at : xxxx`)
        next()
    }
)
const validateUpdatePost = asyncHandler(async (req, res, next) =>{
    if(!isObjectIdOrHexString(req.params.postId)) throw new Error('please check your post id')
    if(!req.body.content) throw new Error(`can't post empty post`);
    const findPost = await postModel.findById(req.params.postId)
    if(req.user._id != findPost.userId) throw new Error('you do not own this post')
    next()
})

const validateAuthorUser = asyncHandler(
    async(req, res, next) =>
    {
        const postId = req.params.postId;
        const getPost = await postModel.findById(postId); console.log(getPost);console.log(req.user);
        if(!getPost) throw new Error('post is unavailable');
        if(!req.user.roles.includes('user')) throw new Error('you are banned'); 
        if(req.user._id != getPost.userId) throw new Error(`this post is private`);
        next();
    }
)

const validateRmvPost = asyncHandler(async (req, res, next) =>{
    if(!req.user.roles || !req.user.roles.includes('admin')) throw new Error('authenic failed')
    const checkPost = await postModel.findById(req.params.postId)
    if(req.user._id != checkPost.userId ) throw new Error('Removal is accepted by admin or owener');
    next()
})

export {validateCreatePost, validateUpdatePost ,validateAuthorUser, validateRmvPost };
