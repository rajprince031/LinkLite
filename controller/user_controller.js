const user = require("../models/user_model");
const {v4:uuidV4} = require('uuid');
const {setUser, getUser} = require('../service/user_auth');


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

    const authToken = setUser(findOneUser); // set jwt token

    return res.status(200).json({success : true, msg : "Login Successfully", authToken});
}

// USER PROFILE

async function handleUserProfile(req,res){
    const authToken = req.headers.authorization;
    const validateUser = getUser(authToken);
    if(!validateUser) return res.status(401).json({error : "User not found"})
        const userProfile =await user.findById({_id:validateUser._id})
    return res.status(200).json({status : true , userProfile});
}

module.exports = {
    handleLoginRequest,
    handleSignUpRequest,
    handleUserProfile
}