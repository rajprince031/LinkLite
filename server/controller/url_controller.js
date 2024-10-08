const URL = require("../models/url_models");

//POST METHOD
async function handleGenerateNewShortUrl(req, res) {
  const { redirectURL, activeStatus, title } = req.body;
  if (!redirectURL || !title)
    return res.status(400).json({ status: false, error: `Required field are missing` });
  const {_id} = req.user
  const { nanoid } = await import("nanoid");
  const shortId = nanoid(8);
  const newURL = URL({
    title,
    shortId,
    redirectURL,
    activeStatus,
    creator: _id,
    vistedHistory: [],
  })
  await newURL.save();
  return res
    .status(201)
    .json({ status: true, msg: "Short ID created successfully", newURL });
}

//REDIRECT URL
async function handleUrlRedirect(req, res) {
  try {
    const { _id, redirectURL } = req.entry;
    const {
      ip,
      browser,
      version,
      os,
      platform,
      source,
      isMobile,
      isTablet,
      isDesktop,
      isBot,
      browserVersion,
    } = req.userDetails;

    await URL.findByIdAndUpdate(
      _id,
      {
        $push: {
          vistedHistory: {
            dateTime: new Date(),
            ip,
            browser,
            version,
            os,
            platform,
            source,
            isMobile,
            isTablet,
            isDesktop,
            isBot,
            browserVersion,
          },
        },
      },
      { new: true }
    );
    return res.redirect(redirectURL);
  } catch (err) {
    // console.log("main", err);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

//GET ALL CREATED URL
async function handleGetAllCreatedUrl(req, res) {
  const { _id: creator } = req.user;
  const allCreatedUrl = await URL.find({ creator });
  return res.status(200).json(allCreatedUrl);
}

//GET ALL DETAILS OF ONE CREATED URL
async function handleGetAllDetailsOfOneCreatedUrl(req, res) {
  try {
    const {urlDetails} = req;
    return res.status(200).json({ status: true,msg :"successfully", urlDetails });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//DELETE CREATED URL
async function handleDeleteCreatedUrl(req, res) {
  try {
    const { _id } = req.params;
    const deletedURL = await URL.findByIdAndDelete(_id);
    if (!deletedURL) return res.status(400).json({ error: "Url not found" });
    return res.status(200).json({ status: true, deletedURL });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//CHANGE ACTIVE STATUS CREATED URL
async function handleChangeActiveStatusOfCreatedUrl(req, res) {
  const { activeStatus } = req.body;
  const { _id } = req.params;
  const url = await URL.findByIdAndUpdate(
    _id,
    {
      activeStatus,
    },{
      new : true
    }
  );
  return res
    .status(200)
    .json({ status: true, msg: "status changed successfully",activeStatus });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleUrlRedirect,
  handleGetAllCreatedUrl,
  handleDeleteCreatedUrl,
  handleChangeActiveStatusOfCreatedUrl,
  handleGetAllDetailsOfOneCreatedUrl,
};
