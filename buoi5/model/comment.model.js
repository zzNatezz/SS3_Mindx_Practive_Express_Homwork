import mongoose from "mongoose";
const { Schema } = mongoose

const commentSchema = new Schema({
    userId : {type : String, ref : "User", required : true},
    postId : {type : String, ref : "Post", required : true},
    content : {type : String, required : true},
    createAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now},
    isPublic : Boolean,
})

const commentModel = mongoose.model('comment', commentSchema);
export {commentModel}