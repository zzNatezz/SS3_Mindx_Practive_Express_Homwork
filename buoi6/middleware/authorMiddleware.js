
async function authorMiddleware (req, res, next){
    try {
        if(!req.user.roles || !req.user.roles.includes('x-admin')){
            res.status(403).send({
                data:null,
                status : "failed",
                error : "Only admin access"
            })
        }
        next();
    } catch (error) {
        res.status(500).send("Server error !!!")
    }
}

export {authorMiddleware}