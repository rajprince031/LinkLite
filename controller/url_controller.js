const URL = require("../models/url_models")

async function handleGenerateNewShortUrl(req,res){
    const {redirectURL,creator} = req.body;
    if(!redirectURL || !creator) return res.status(400).json({error : `Required field are missing`})
        
    const {nanoid} = await import("nanoid");
    const shortId = nanoid(8);
    await URL.create({
        shortId,
        redirectURL,
        creator,
        vistedHistory : []
    })
    
    return res.status(201).json({ststus : true, msg : "Short ID created successfully" , id : shortId})
}


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

async function handleGetAllCreatedUrl(req,res){
    const allCreatedUrl = await URL.find({});
    return res.status(200).json(allCreatedUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleUrlRedirect,
    handleGetAllCreatedUrl
}