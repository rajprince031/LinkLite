const URL = require("../models/url_models");

async function isOwner_auth(req,res,next){
    const {_id: userId} = req.user;
    const {_id} = req.params;
    const urlDetails = await URL.findById(_id)
    if(!urlDetails) return res.status(404).json({error : "User not found"})
    const {creator} = urlDetails
    if(creator != userId) return res.status(401).json({error : "User not authorized"})
    req.urlDetails = urlDetails;
    next();
}

module.exports = {isOwner_auth}