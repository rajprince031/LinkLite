const URL = require("../models/url_models");
const { default: axios } = require("axios");

async function getAllUserInfo(req, res, next) {
  try {
    const { shortId } = req.params;
    if (!shortId)
      return res.status(400).json({ status: false, error: "url required!" });

    const entry = await URL.findOne({ shortId });

    if (!entry || !entry?.activeStatus)
      return res.status(400).json({ status: false, msg: "URL NOT FOUND" });

    const response = await axios.head(entry.redirectURL);
    if (response.status >= 200 && response.status < 300) {      
        const deviceDetails = req.useragent;
        // console.log("printing the details : -",req)
      req.userDetails = {
        ip : req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.connection.remoteAddress ||
        req.ip, //ip address
        browser: deviceDetails.browser, // Browser name
        version: deviceDetails.version, // Browser version
        os: deviceDetails.os, // Operating system name
        platform: deviceDetails.platform, // Platform or device type
        source: deviceDetails.source, // Full User-Agent string

        // Mobile/Tablet/Desktop
        isMobile: deviceDetails.isMobile, // Is it a mobile device?
        isTablet: deviceDetails.isTablet, // Is it a tablet device?
        isDesktop: deviceDetails.isDesktop, // Is it a desktop?
        isBot: deviceDetails.isBot, // Is it a bot?

        // Detailed Device Information
        browserVersion: deviceDetails.version, // Browser version
      }
      req.entry = entry;
      //console.log(req.userDetails)
      return next();
    }
    return res.status(404).json({error : "Page Not Found"})
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server error!!" });
  }
}

module.exports = { getAllUserInfo };
