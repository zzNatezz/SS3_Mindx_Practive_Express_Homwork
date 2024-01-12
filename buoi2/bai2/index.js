import express from "express";
import { users, posts } from "./data.js";

const sv = express();

sv.use(express.json());

//1.Viết API lấy thông tin của user với id được truyền trên params.

sv.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUser = users.find((item) => (item.id = id));
  res.status(200).send(findUser);
});



//2.Viết API tạo user với các thông tin như trên users, với id là random (uuid), email là duy nhất, phải kiểm tra được trùng email khi tạo user.
sv.post("/users/add", (req, res) => {
  const randomID = (e) => {
    let randomID = "";
    const stringList =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i <= e; i++) {
      randomID =
        randomID +
        stringList.charAt(Math.floor(Math.random() * stringList.length));
    }
    return randomID;
  };
  const body = req.body;
  const newUser = {
    id: `${randomID(8)}-${randomID(4)}-${randomID(4)}-${randomID(12)}`,
    userName: body.userName,
    email: body.email,
    age: body.age === undefined ? "" : body.age,
    avatar: body.age === undefined ? "" : body.avatar,
  };
  const isEmail = users.filter((item) => item.email === body.email);
  if (isEmail.length === 0) {
    const addUser = [...users, newUser];
    res.status(200).send(addUser);
  } else {
    res.status(404).send("the e-mail is existing, please try other");
  }
});

//3.Viết API lấy ra các bài post của user được truyền userId trên params.
sv.get("/users/post/:userId", (req, res) => {
  const { userId } = req.params;
  const findUserId = posts.filter((item) => (item.userId = userId));
  const getPostasUsetId = findUserId.map((item) => item.content);
  findUserId.length !== 0
    ? res.status(200).send(getPostasUsetId) && console.log("Succesfull")
    : res.status(500).send("user ID is not available") && console.log("failed");
});
//4.Viết API thực hiện tạo bài post với id của user được truyền trên params.
sv.post("/users/post/create/:userId", (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  const findUser = posts.filter((item) => item.userId === userId);
  const addContent = findUser.map((item) => Object.assign({}, item, body));
  console.log(addContent);
  res.status(201).send(addContent);
});

//5.Viết API cập nhật thông tin bài post với postId được truyền trên params, chỉ có user tạo bài mới được phép.
sv.put("/users/post/update/:postId/:userId", (req, res) => {
  const { postId, userId } = req.params;
  const body = req.body;
  const findUser = posts.filter((item) => item.postId=== postId && item.userId === userId );
  if (findUser.length === 0){
    res.status(401).send('you are not own this post')
  } else{
    findUser.map(item => item.content = body.content)
    res.status(201).send(findUser)
  }
});

//6.Viết API xoá bài post với postId được truyền trên params, chỉ có user tạo bài mới được phép.
sv.delete('/users/deletepost/:userId/:postId',(req, res) =>{
    const {userId, postId} = req.params;
    const findUserId = posts.filter((item) => item.postId === postId && item.userId === userId );
    if (findUserId.length === 0){
        res.status(401).send('you are not own this post')
    } else{
        findUserId.map(item => item.content = '')
      res.status(201).send(findUserId)
    }
})

//7.Viết API tìm kiếm các bài post với content tương ứng được gửi lên từ query params.   <-- Bai nay em khum hieeu de nen xin phep a :(
sv.get('/users/get/post', (req, res) => {
    const query = req.query
})



//8.Viết API lấy tất cả các bài post với isPublic là true, false thì sẽ không trả về.
sv.get('/users/get/post/isPublicPost', (req, res) => {
    const filterIsPublic = posts.filter(item => item.isPublic === true)
    if(filterIsPublic.length === 0 ){
        res.status(401).send('no public post, sorry about that')
    }
    else{
        console.log('sdad');
        res.status(200).send(filterIsPublic)
    }
    
})

sv.listen(3000, () => {
    console.log("sever is running.....");
  });