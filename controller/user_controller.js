const user = require("../models/user_model");

async function handleSignUpRequest(req,res){
    const {firstName,lastName,email,password} = req.body;
    if(!firstName || !email || !password) 
        return res.status(400).json({error : "Required field are missing"});

    const newUser = await user.create({
        firstName,
        lastName,
        email,
        password,
    });
    return res.status(201).json({status : true, msg : "New User created successfully", id : newUser._id});
}   

async function handleLoginRequest(req,res){
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({error : "Required field are missing"});
    const findUser = await user.findOne({email,password});
    if(!findUser) return res.status(400).json({error:"User not found"});
    return res.status(200).json({success : true, msg : "Login Successfully", id:findUser._id});
}

module.exports = {
    handleLoginRequest,
    handleSignUpRequest
}