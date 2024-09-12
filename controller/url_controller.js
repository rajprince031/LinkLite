const URL = require("../models/url_models")
const {getUser} = require("../service/user_auth")
//POST METHOD
async function handleGenerateNewShortUrl(req,res){
    const {redirectURL,sessionId} = req.body;
    if(!redirectURL) return res.status(400).json({error : `Required field are missing`});
    const user = getUser(sessionId);
    if(!user) return res.status(400).json({error:"Access Denied"});
    const {nanoid} = await import("nanoid");
    const shortId = nanoid(8);
    await URL.create({
        shortId,
        redirectURL,
        creator :  user._id,
        vistedHistory : []
    })
    
    return res.status(201).json({ststus : true, msg : "Short ID created successfully" , id : shortId})
}


//REDIRECT URL
async function handleUrlRedirect(req, res){
    const {shortId} =  req.params;

    if(!shortId) return res.status(400).json({error : "url required!"})
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push : {
            vistedHistory : {timestamps : Date.now()}
        }
    })
    if(!entry) return res.status(400).json({msg : "URL NOT FOUND"});
    return res.redirect(entry.redirectURL);
}


//GET ALL CREATED URL
async function handleGetAllCreatedUrl(req,res){
    const uid = req.headers.authorization;
    const {id:creator} =  getUser(uid);
    const allCreatedUrl = await URL.find({creator});
    return res.status(200).json(allCreatedUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleUrlRedirect,
    handleGetAllCreatedUrl
}