import axios, { all } from "axios";
import { stringify, v4 as uuidv4} from 'uuid';
import express  from "express"  
import mongoose, { mongo } from "mongoose";
import { ReturnDocument } from "mongodb";

const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const user = new schema({
    id: String,
    userName : String,
    email : String,
    age : String,
    avatar : String,
});
const post = new schema({
    id: String,
    userID : String,
    content : String,
    isPublic : Boolean,
    creatAt : Date,
});
const comment = new schema({
    id: String,
    postID : String,
    userID : String,
    content : String,
    creatAt : Date,
});

const userModel = mongoose.model("users", user);
const postModel = mongoose.model("posts", post);
const commentModel = mongoose.model("comments", comment);

async function connectMongoDb(){
    await mongoose.connect("mongodb://localhost:27017/midszx");
}

const sv = express();
sv.use(express.json());

//1.Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).

sv.post("/users", async (req, res) =>{
    
    try {
        const body = req.body;
        if(!body.userName) throw new Error("Invalid userName data")
        if(!body.email) throw new Error("Invalid email data")
        if(!body.age) throw new Error("Invalid age data")
        if(!body.avatar) throw new Error("Invalid avatar data")

        const newUser = await userModel.create(body)
        res.status(201).send(newUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }

})

//2. Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
sv.post('/posts/:userId', async (req, res) =>{
    const body = req.body;
    const {userId} = req.params;
    try {
        if(!body.content) throw new Errow ("invalid content")
        if(!body.isPublic) throw new Errow ("invalid isPublic")

        const newPost = await postModel.create({
            userID : userId,
            content : body.content,
            isPublic : body.isPublic,
            creatAt : new Date,
        })
        res.status(201).send(newPost)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//3.Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
sv.put('/posts/:postId', async (req, res) =>{
    const body = req.body;
    const {postId} = req.params;
    console.log(postId);
    try {
        if(!body.userID) throw new Error('please sign in to edit')
        const findPostAndUpdate = await postModel.findById(postId)
        if(findPostAndUpdate.userID !== body.userID) throw new Error("you do not own this post")
        if(findPostAndUpdate.userID == body.userID){
            findPostAndUpdate.content = body.content;
            await postModel.create(findPostAndUpdate)
            res.status(201).send("update successfully")
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//4.Viết API cho phép user được comment vào bài post
sv.post('/comments/:postID', async (req, res) =>{
    const {postID} = req.params;
    const body = req.body;
    try {
        if(!body.userID) throw new Error ('please sign in');
        if(!body.content) throw new Error ('please check content');
        const checkPost = await postModel.findById(postID);
        if(!checkPost) throw new Error('This post is unavailalbe')
        const newComment = await commentModel.create({
            postID : postID,
            userID : body.userID,
            content : body.content,
            creatAt : new Date(),
        });
        res.status(201).send(`Comment has been addeed ${newComment.content}`)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//5.Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
sv.put('/comments/:id', async (req, res) =>{
    const body = req.body;
    const {id} = req.params;
    try {
        if(!body.userID) throw new Error('please sign in');
        if(!body.content) throw new Error('the content is remain');
        if(!body.postID) throw new Error('the post is unavailable');
        const findComment = await commentModel.findById(id);
        if(findComment.userID !== body.userID) throw new Errow ('you do not own this comment');
        findComment.content = body.content;
        await commentModel.create(findComment);
        res.status(201).send('the comment is updated successffuly');
    } catch (error) {
        res.status(500).send(error.message);
    }


})

//6.Viết API lấy tất cả comment của một bài post. === bai 8
sv.get('/comments', async (req, res) =>{
    try {
        const queryPostID = req.query.postid;
        const allPostID = await commentModel.find({postID : queryPostID})
        if(!allPostID) throw new Error('Post is unavailable or removed by manager')
        const allComment = allPostID.map(item=> item.content);
        res.status(200).send(allComment)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

//7.Viết API lấy tất cả các bài post, 3 comment đầu (dựa theo index) của tất cả user
sv.get('/post/topComment', async (req, res) =>{
    const query = req.query;
    try {
        const allPost = await postModel.find(query);
        const allComments = await commentModel.find(query);
        const TopCommentAsPost = allPost.map(( item )=>{
            const commentAsID = allComments.filter(i => i.postID === item._id.toString());
            const TOP_3_COMMENT = commentAsID.splice(0,3);
            return{
                postId : item._id.toString(),
                 comments : TOP_3_COMMENT,
            }
        })
        res.status(201).send(TopCommentAsPost)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

connectMongoDb().then(
    sv.listen(3000, () =>{
        console.log("server is running ... !!!");
    })

);
