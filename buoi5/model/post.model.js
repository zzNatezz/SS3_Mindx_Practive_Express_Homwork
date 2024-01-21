import mongoose from "mongoose";
const { Schema } = mongoose

const PostSchema = new Schema({
    userId : {type : String, ref : "User", required : true},
    content : {type : String, required : true},
    createAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now},
    isPublic : Boolean,
})

const postModel = mongoose.model('post', PostSchema);
export {postModel}