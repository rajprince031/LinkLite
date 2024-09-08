const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleUrlRedirect,
  handleGetAllCreatedUrl
} = require("../controller/url_controller");

const router = express.Router();

router.route("/urlShortener")
.post(handleGenerateNewShortUrl)
.get(handleGetAllCreatedUrl);

router.get("/:shortId", handleUrlRedirect);

module.exports = router;
