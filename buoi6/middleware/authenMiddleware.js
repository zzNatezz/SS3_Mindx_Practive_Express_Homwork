import {userModel} from "../model/user.model.js";

async function authenMiddleware (req, res, next){
    try {
        const userName = req.headers?.["x-username"];
        const user = await userModel.findOne({userName});
        if(!user){
            res.status(403).send({
                data:null,
                status : failed,
                error : "Authentication failled"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send("Server error !!!")
    }
}

export {authenMiddleware}