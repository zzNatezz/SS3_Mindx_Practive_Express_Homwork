
const checkCreateUser = ((req, res, next)=>{
    if(!req.body.userName) {throw new Error('please check user name')};
    if(!req.body.password) {throw new Error('please check password')};
    next()
});
const checkUpdateUser = ((req, res, next)=>{
    if(!isObjectIdOrHexString(req.params.postId)) throw new Error("please check Id");
    if(!req.body.userName) {throw new Error('please check user name')};
    if(!req.body.password) {throw new Error('please check password')};
    next()
});




export {checkCreateUser , checkUpdateUser }