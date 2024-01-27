import express from 'express'
import asyncHandler from "express-async-handler"
import { checkCreateUser , checkUpdateUser } from '../middleware/userMiddle/user.middleware.js';
import { userModel } from '../model/user.model.js';

const userController = express.Router();

userController.post('/', checkCreateUser, asyncHandler(async (req, res)=>{
    const body = req.body;
    const createUser = await userModel.create({
        userName : body.userName,
        createAt : new Date().toISOString(),
        email : !body.email ? "unavailable now" : body.email,
        password : body.password,
        roles : 'user'
    })
    res.status(201).send({
        data : createUser,
        status : "successful",
        msg : `user ${body.userName} has been created ! enjoy our app.`
    })
}))

userController.get('/', asyncHandler(async (req,res) =>{
    const getAllUser = await userModel.find({})
    res.status(200).send({
        data : getAllUser,
        status : 'Completed',
        mes : "all user are showed",
    })
}))
userController.put('/:postId',checkUpdateUser, asyncHandler(async (req,res) =>{
    const body = req.body;
    const getUserById = await userModel.findById(req.params.postId);
    getUserById.userName = body.userName,
    getUserById.email = body.email,
    getUserById.password = body.password,
    await getUserById.save()
    res.status(201).send({
        data: getUserById,
        status : 'successful',
        mes : "update completed"
    })
}))

userController.delete('/:postId', asyncHandler(async (req,res) =>{
    const findAndDeleteUser = await userModel.findByIdAndDelete(req.params.postId);
    res.status(201).send({
        status : 'successful',
        mes : "Acount has been removed"
    })
}))

export {userController};