import mongoose from "mongoose";

const { Schema } = mongoose;

const cmtSchema = new Schema({
    userId : {type : String, required : true},
    postId : {type : String, required : true},
    content : {type : String, required : true},
    createdAt : {type : Date, default: Date.now},
    updatedAt : Date
})

const cmtModel = mongoose.model('comment', cmtSchema );
export {cmtModel}