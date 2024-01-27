import { isObjectIdOrHexString } from "mongoose";


const validateCreateComment = async (req, res, next) =>{
    if(!req.body.content) throw new Error(`please file in your comment`);
    if(!req.body.userId) throw new Error(`please sign in`);
    if(!isObjectIdOrHexString(req.params.postId)) throw new Error(`something wrong with this post`);
    next()
}
const validateUpdateComment = async (req, res, next) =>{
    if(!req.body.content) throw new Error(`please file in your comment`);
    if(!req.body.userId) throw new Error(`please sign in`);
    if(!isObjectIdOrHexString(req.params.commentId)) throw new Error(`something wrong with this post`);
    next()
}

export {validateCreateComment, validateUpdateComment}