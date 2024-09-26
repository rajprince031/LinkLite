const {getUser} = require("../service/user_auth")

async function restrictToLoggedInUserOnly(req,res,next){
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(401).json({status : false, error : "User not Logged in"});
    
    const user = getUser(authToken);
    if(!user) return res.status(401).json({status : false, error : "User not found"});
    req.body._id = user._id;
    next()
}




module.exports = {
    restrictToLoggedInUserOnly
}