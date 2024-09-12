const user = require("../models/user_model");
const {v4:uuidV4} = require('uuid');
const {setUser} = require('../service/user_auth');

//SIGNUP HANDLER

async function handleSignUpRequest(req,res){
    const {firstName,lastName,email,password} = req.body;
    console.log(req.body)
    if(!firstName || !email || !password) 
        return res.status(400).json({error : "Required field are missing"});

    if(await user.findOne({email})) 
        return res.status(409).json({
        status:false , 
        message: "The email address is already registered."
    })

    const newUser = await user.create({
        firstName,
        lastName,
        email,
        password,
    });
    return res.status(201).json({status : true, msg : "New User created successfully", id : newUser._id});
}   

//LOGIN HANDLER

async function handleLoginRequest(req,res){
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({error : "Required field are missing"});
    const findOneUser = await user.findOne({email,password});
    if(!findOneUser) return res.status(401).json({error:"User not found"});

    const sessionId = uuidV4();
    setUser(sessionId, findOneUser); // Map user to the session id

    return res.status(200).json({success : true, msg : "Login Successfully", sessionId});
}

module.exports = {
    handleLoginRequest,
    handleSignUpRequest
}