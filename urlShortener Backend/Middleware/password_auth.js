const user = require('../models/user_model');

async function ValidatePassword(req,res,next){
    const {password} = req.body;
    const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/.test(password);
    if(!isValidPassword) 
        return res.status(400).json({error:"Password are not valid"});
    next();
}

async function ValidateChangePassword(req,res,next){
    const {newPassword} = req.body;
    const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/.test(newPassword);
    if(!isValidPassword) 
        return res.status(400).json({error:"New Password are not valid"});
    next();
}


module.exports = {ValidatePassword,ValidateChangePassword}