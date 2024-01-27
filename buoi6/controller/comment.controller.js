import express from "express"
import asyncHandler from "express-async-handler"
import { validateCreateComment , validateUpdateComment } from "../middleware/cmtMiddle/cmt.middleware.js";
import { cmtModel } from "../model/comment.model.js";

const cmtController = express.Router();

cmtController.post('/:postId', validateCreateComment, asyncHandler(async(req, res)=>{
    const body = req.body;
    const creatCmt = await cmtModel.create({
        userId : body.userId,
        postId : req.params.postId,
        content : body.content,
    })
    res.status(200).send({
        data : creatCmt,
        status : 'Successful',
        mes : "your comment has been created"
    })
}))
cmtController.get('/:postId', asyncHandler(async(req, res)=>{
    const getComment = await cmtModel.find({postId : req.params.postId})
    res.status(200).send({
        data : getComment,
        status : 'Successful',
        mes : "your comment has been shown"
    })
}))

cmtController.put('/:commentId', validateUpdateComment, asyncHandler(async(req, res)=>{
    const body = req.body;
    const updatedCmt = await cmtModel.findByIdAndUpdate(req.params.commentId , {content : body.content} && {updatedAt : new Date().toISOString()});

    res.status(200).send({
        data : updatedCmt,
        status : 'Successful',
        mes : "your comment has been created"
    });
}))
cmtController.delete('/:commentId', asyncHandler(async(req, res)=>{
    const body = req.body;
    const removedCmt = await cmtModel.findByIdAndDelete(req.params.commentId)
    res.status(200).send({
        status : 'Successful',
        mes : "your comment has been removed"
    });
}))

export{cmtController}