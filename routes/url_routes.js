const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleUrlRedirect,
} = require("../controller/url_controller");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortID", handleUrlRedirect);

module.exports = router;
