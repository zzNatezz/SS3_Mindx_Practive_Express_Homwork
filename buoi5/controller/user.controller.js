import express from "express"
import { userModel } from "../model/user.model.js";
import { postModel } from "../model/post.model.js";

const userController = express.Router();

//1.Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
userController.post('/', async (req, res) =>{
    try {
        const body = req.body;
        if(!body.userName) throw new Error('invalid user name data');
        if(!body.email) throw new Error('invalid email data');
        if(!body.age) throw new Error('invalid age data');
        if(!body.avatar) throw new Error('invalid avatar data');
        const checkUser  = await userModel.find({userName : body.userName} && {email : body.email})
        if(checkUser.length === 0 ){
            const createUser = await userModel.create({...body});
            res.status(201).send('Registed successfully User');
        }
        else{
            res.status(500).send('user name or email have already registed')
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

///2.Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
userController.post('/:userId', async (req, res) =>{
    try {
        const body = req.body; const {userId} = req.params;
        if(!body.content) throw new Error('no content');
        const createPost  = await postModel.create({
            userId : userId,
            content : body.content,
            createAt : new Date().toISOString()
        })
        res.status(200).send('Post has been created!!')
    } catch (error) {
        res.status(500).send(error.message);
    }
})


export {userController};