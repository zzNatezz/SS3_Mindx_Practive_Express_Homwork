import mongoose from "mongoose";

const { Schema } = mongoose;

const PostShema = new Schema({
    content : {type : String, required : true},
    userId : {type : String, required : true},
    createdAt : {type : Date, default: Date.now},
    updatedAt : Date
})

const postModel = mongoose.model('post', PostShema );
export {postModel}