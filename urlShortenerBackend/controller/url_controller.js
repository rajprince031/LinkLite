const URL = require("../models/url_models");
const { findById } = require("../models/user_model");
const { getUser } = require("../service/user_auth");


//POST METHOD
async function handleGenerateNewShortUrl(req, res) {
  const { redirectURL, authToken, activeStatus, title } = req.body;
  if (!redirectURL || !title)
    return res
      .status(400)
      .json({ status: false, error: `Required field are missing` });
  const user = getUser(authToken);
  if (!user)
    return res.status(400).json({ status: false, error: "Access Denied" });
  const { nanoid } = await import("nanoid");
  const shortId = nanoid(8);
  await URL.create({
    title,
    shortId,
    redirectURL,
    activeStatus,
    creator: user._id,
    vistedHistory: [],
  });

  return res
    .status(201)
    .json({ status: true, msg: "Short ID created successfully", id: shortId });
}

//REDIRECT URL
async function handleUrlRedirect(req, res) {
  const { shortId } = req.params;
  const { ip, hostname} = req;

  if (!shortId)
    return res.status(400).json({ status: false, error: "url required!" });
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        vistedHistory: {
          dateTime: new Date(),
          ip,
          hostname
        },
      },
    },
    { new: true }
  );
  if (!entry || !entry?.activeStatus)
    return res.status(400).json({ status: false, msg: "URL NOT FOUND!" });
  
  return res.redirect(entry.redirectURL);
}

//GET ALL CREATED URL
async function handleGetAllCreatedUrl(req, res) {
  const authToken = req.headers.authorization;
  const { _id: creator } = getUser(authToken);
  const allCreatedUrl = await URL.find({ creator });
  return res.status(200).json(allCreatedUrl);
}

//GET ALL DETAILS OF ONE CREATED URL
async function handleGetAllDetailsOfOneCreatedUrl(req,res){
  const {_id} = req.params;
  const urlDetails = await URL.findById(_id);
  if(!urlDetails) return res.status(400).json({error : "URL not found"})
    return res.status(200).json({status : true , urlDetails})
}


//DELETE CREATED URL
async function handleDeleteCreatedUrl(req,res){
  const {_id} = req.params;
  const deletedURL = await URL.findByIdAndDelete(_id);
  if(!deletedURL) return res.status(400).json({error : "Url not found"})
  return res.status(200).json({status : true , deletedURL})
}

//CHANGE ACTIVE STATUS CREATED URL
async function handleChangeActiveStatusOfCreatedUrl(req,res){
  const {activeStatus} = req.body;
  const {_id} = req.params
  const url = await URL.findOneAndUpdate({_id},{
    activeStatus
  })
  return res.status(200).json({status:true, msg : "status changed successfully"})
}


module.exports = {
  handleGenerateNewShortUrl,
  handleUrlRedirect,
  handleGetAllCreatedUrl,
  handleDeleteCreatedUrl,
  handleChangeActiveStatusOfCreatedUrl,
  handleGetAllDetailsOfOneCreatedUrl
};