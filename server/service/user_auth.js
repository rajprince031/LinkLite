const jwt = require("jsonwebtoken");
require('dotenv').config()

function setUser(user){
    const{_id, fullName :name, email, firstName, lastName} = user;
   return jwt.sign({_id,name,email,firstName,lastName},process.env.uniqueKey)
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