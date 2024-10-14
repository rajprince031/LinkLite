const {getUser} = require("../service/user_auth")
const User = require('../models/user_model')
async function restrictToLoggedInUserOnly(req,res,next){
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(401).json({status : false, error : "User not Logged in"});
    
    const user = getUser(authToken);
    const findOne = await User.findById(user._id)
    if(!user || !findOne) return res.status(401).json({status : false, error : "User not found"});
    findOne.encryptPassword = findOne.salt = undefined;
    req.user = findOne;
    next()
}




module.exports = {
    restrictToLoggedInUserOnly
}