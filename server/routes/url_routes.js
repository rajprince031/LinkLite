const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAllCreatedUrl,
  handleDeleteCreatedUrl,
  handleChangeActiveStatusOfCreatedUrl,
  handleGetAllDetailsOfOneCreatedUrl
} = require("../controller/url_controller");

const router = express.Router();

router.route("/url-shortener")
.post(handleGenerateNewShortUrl)
.get(handleGetAllCreatedUrl);


router.route("/url-shortener/:_id")
.get(handleGetAllDetailsOfOneCreatedUrl)
.patch(handleChangeActiveStatusOfCreatedUrl)
.delete(handleDeleteCreatedUrl)




module.exports = router;