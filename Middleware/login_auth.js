const {getUser} = require("../service/user_auth")

async function restrictToLoggedInUserOnly(req,res,next){

    const uid = req.headers.authorization
    if(!uid) return res.status(401).json({status : false, error : "User not Logged in"});
    
    const user = getUser(uid);
    if(!user) return res.status(401).json({status : false, error : "User not found"});

    next()
}

module.exports = {
    restrictToLoggedInUserOnly
}