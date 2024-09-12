const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleUrlRedirect,
  handleGetAllCreatedUrl
} = require("../controller/url_controller");

const router = express.Router();

router.route("/url-shortener")
.post(handleGenerateNewShortUrl)
.get(handleGetAllCreatedUrl);



module.exports = router;