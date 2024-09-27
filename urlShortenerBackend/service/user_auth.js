const jwt = require("jsonwebtoken");
require('dotenv').config()

function setUser(user){
   return jwt.sign({_id : user._id,email:user.email},process.env.uniqueKey)
}

function getUser(authToken){
    if(!authToken) return null;
    try {
        return jwt.verify(authToken,process.env.uniqueKey);
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}