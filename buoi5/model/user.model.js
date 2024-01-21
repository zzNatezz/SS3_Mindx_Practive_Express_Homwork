import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    userName : { type :  String, required : true },
    email: {type : String, required : true},
    age : Number,
    avatar : String,
    createAt : {type : Date , default: Date.now}
})

const userModel = mongoose.model('user', userSchema);
export {userModel}