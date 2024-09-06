const URL = require("../models/url_models")

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({"error" : "URL is required"})
        
    const {nanoid} = await import("nanoid");
    const shortID = nanoid(8);
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        vistedHistory : []
    })
    
    return res.status(201).json({ststus : true, msg : "Short ID created successfully" , id : shortID})
}


async function handleUrlRedirect(req, res){
    const shortId =  req.params.shortID;
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

async function handleGetAllCreatedUrl(req,res){
    const allCreatedUrl = await URL.find({});
    return res.status(200).json(allCreatedUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleUrlRedirect,
    handleGetAllCreatedUrl
}