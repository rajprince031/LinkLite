const user = require('../models/user_model');

async function validateSignUpDetails(req,res,next){
    const {firstName,lastName,email,password} = req.body;
    if(!firstName ||!email ||!password) 
        return res.status(400).json({error:"Required field are missing"});
    
    const findUser = await user.findOne({email})
    if(findUser) return res.status(409).json({error:"email already exist"});

    next();
        
}

module.exports = {
    validateSignUpDetails
}