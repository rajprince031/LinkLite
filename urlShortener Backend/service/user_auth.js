const jwt = require("jsonwebtoken");

const key = "rAjkumAr031@@#"
function setUser(user){
   return jwt.sign({_id : user._id,email:user.email},key)
}

function getUser(authToken){
    if(!authToken) return null;
    try {
        return jwt.verify(authToken,key);
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}