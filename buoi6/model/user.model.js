import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    userName : {type : String, required : true},
    createAt : {type : Date, default: Date.now},
    updatedAt : Date,
    email : String,
    password : String,
    roles : [String]
})

const userModel = mongoose.model('user', UserSchema );
export {userModel}