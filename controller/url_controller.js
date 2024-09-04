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
    
    return res.status(201).json({status : "Short ID created successfully" , id : shortID})
}


async function handleUrlRedirect(req, res){
    const shortId =  req.params.shortID;
    if(!shortId) return res.status(400).json({error : "Page not found"})
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push : {
            vistedHistory : {timestamps : Date.now()}
        }
    })
    return res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleUrlRedirect
}