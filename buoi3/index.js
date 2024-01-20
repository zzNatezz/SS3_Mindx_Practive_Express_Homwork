import axios from "axios";
import { v4 as uuidv4} from 'uuid';
import express  from "express"

const sv = express();

sv.use(express.json());


sv.get('/users', async (req,res) =>{
    const {data} = await axios.get('http://localhost:8000/users')
    res.status(200).send(data)
})

//1.Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
sv.post("/users", async (req, res) =>{
    const body = req.body;
    try {
        if(!body.userName) throw new Error("no userName in body");
        if(!body.email) throw new Error("no email in body");
        if(!body.age) throw new Error("no age in body");
        if(!body.avatar) throw new Error("no avatar in body");

        const randomId ="US" + (Math.floor(Math.random()*9000)+1000);
        
        const newUser = {...body, id : randomId};
        const {data : addNewUser} = await axios.post('http://localhost:8000/users', newUser)
        res.status(201).send(addNewUser)
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})


//2.Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
sv.post('/posts/:userId', async(req, res) =>{
    const body = req.body;
    const {userId} = req.params;
    try {
        if(!body.content)throw new Error('invalid key:content');
        if(!body.createdAt)throw new Error('invalid createAt');
        if(!body.isPublic)throw new Error('invalid isPublic');

        const cloneUser = await axios.get('http://localhost:8000/users');
        const checkId = cloneUser.data.find(item => item.id === userId)
        if(!checkId){
            res.status(500).send('please sign in')
        }else{
            const newPostId = uuidv4();
            const newPost = {...body, id : checkId.id, postId : newPostId};
            const {data : AddNewPost} = await axios.post("http://localhost:8000/posts", newPost);
            res.status(201).send(AddNewPost);
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//3.Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
sv.put('/users/posts/:postId', async (req, res) =>{
    const body = req.body;
    const { postId } = req.params;
    try {
        if(!body.content)throw new Error('invalid key: content');
        if(!body.createdAt)throw new Error('invalid key: createAt');
        if(!body.isPublic)throw new Error('invalid key: isPublic');
        const clonePost = await axios.get(`http://localhost:8000/posts`);
        const findPost = clonePost.data.find(item => item.postId === postId);
        console.log(clonePost);
        if(!findPost){
            res.status(500).send('Post is unavailable or removed')
        }
        else{
            if(findPost.id !== body.id ){
                res.status(500).send('you do not own this post')
            }else{
                const editContent = await axios.put(`http://localhost:8000/posts/${findPost.id}`, body);
                res.status(200).send("content has been updated.");
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//4.Viết API cho phép user được comment vào bài post
sv.put('/users/comment/:postId', async (req, res) =>{
    const { postId } = req.params;
    const body = req.body;
    try {
        if(!body.id) throw new Error('please sign in');
        if(!body.postId) throw new Error('post is unavailable or removed');
        if(!body.comment) throw new Error(`Comemnt can't empty`);
        const {data : getPost} = await axios.get('http://localhost:8000/posts');
        const isPost = getPost.find(item => item.postId === postId);
        if(!isPost){
            res.status(500).send('Post has been removed')
        }
        if(!isPost.comment){
            const creatComment = {...isPost, comment : [ {id: 1, content : body.comment, userId : body.id}] };
            await axios.put(`http://localhost:8000/posts/${isPost.id}`, creatComment);
            res.status(201).send("Comment has been created and added to your post");
        }
        if(isPost.comment.length > 0){
            isPost.comment.push({id : isPost.comment.length+1, content : body.comment, userId : body.id});
            await axios.put(`http://localhost:8000/posts/${isPost.id}`, isPost);
            res.status(201).send('Comemnt has been added')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//5.Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa) <-- bai nay em chua lảm a
sv.put('/users/editComment/:postId', async (req, res) =>{
    const {postId} = req.params;
    const body = req.body;
    try {
        if(!body.content) throw new Error(`content can't empty`);
        if(!body.userId) throw new Error(`please sign in`);
        const {data : getPost} = await axios.get('http://localhost:8000/posts');
        const isPost = getPost.find(item => item.postId === postId);
        if(!isPost){
            res.status(500).send('Post has been removed')
        }
        else{
            const checkUserAndID = isPost.comment.find(item => item.id === body.id );
            if(!checkUserAndID ){
                res.status(401).send(`can't edit because you do not own this post or this post is removed by manager due to company policy`)
            }
            else{
                const findIndex = isPost.comment.findIndex(item => item.id === body.id)
                isPost.comment[findIndex] = body;
                await axios.put(`http://localhost:8000/posts/${isPost.id}`,isPost)
                res.status(201).send("Edit successfully")
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})
sv.listen(3000, () =>{
    console.log('Server is running....!!!');
})