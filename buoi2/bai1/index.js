import express from "express";

const classes = [
    {
        id : 1,
        name: 'Mindx 1',
        member: 39
    },
    {
        id : 2,
        name: 'Mindx 2',
        member: 40
    },
    {
        id : 3,
        name: 'Mindx 3',
        member: 55
    },
    {
        id : 4,
        name: 'Mindx 4',
        member: 47
    },
]

export default classes;


const sever = express();

sever.use(express.json()); // <-- Middle ware = functino -> use to handle object

sever.get('/home',(req, res) =>{
    res.status(200).send('hello mindx')
});
sever.post('/user', (req,res) =>{
    res.status(201).send({
        name : 'Thuc',
        age : '29'
    })
})

//
sever.get('/classes/over40', (req,res) =>{
    const over40 = classes.filter(item => item.member > 40 )
    res.status(200).send(over40)
})

// sever.get('/classes', (req,res) =>{
//     res.status(200).send(classes)
// })
// Nếu có query là memberOver40: true thì trả những class có member > 40 con k thi tra ve clsses
//http://localhost:3000/classes?memberOver40=true&memberOver30=true
sever.get('/classes',(req, res)=>{
    const query = req.query
    if (query.memberOver40 == 'true') {
        const over40 = classes.filter((item) => item.member > 40);
        res.status(200).send(over40);
      } else {
        res.status(200).send(classes);
      } 
    });

sever.put('/classes/:id', (req, res) =>{
    console.log('param', req.params);
    console.log('body', req.body);
    const index = classes.findIndex(item => item.id === Number(req.body.id))
    classes[index] = req.body;
    res.status(200).send(classes)
}) 

                // ---~~~ HOMEWORK ~~~---
//// Tạo thêm 1 class vào mảng classes -> Về nhà làm
sever.post('/classes', (req,res)=>{
    const body = req.body;
    const isDuplicateID = classes.includes(item => item.id === body.id);
    if(!isDuplicateID){
        const newClassed = [...classes, body];
        console.log('addition is completed');
        res.status(201).send(newClassed)
    }
    else{
        res.status(403).send('ID is already existing, please try an other ID')
    };
});

// DELETE method dùng để xoá data
sever.delete('/classes/:id', (req, res) =>{
    const {id} = req.params;    
    const isDelete = classes.findIndex(item => item.id == Number(id));
    const sub_clas = classes.splice(isDelete, 1);
    console.log(sub_clas);
    console.log(classes);
    res.status(204).send(sub_clas)
})

sever.listen(3000, () => {

    console.log('sever is running.');
})