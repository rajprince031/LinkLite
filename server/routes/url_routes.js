const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAllCreatedUrl,
  handleDeleteCreatedUrl,
  handleChangeActiveStatusOfCreatedUrl,
  handleGetAllDetailsOfOneCreatedUrl
} = require("../controller/url_controller");
const { isOwner_auth } = require("../Middleware/isOwner_auth");

const router = express.Router();

router.route("/url-shortener")
.post(handleGenerateNewShortUrl)
.get(handleGetAllCreatedUrl);


router.route("/url-shortener/:_id")
.get(isOwner_auth,handleGetAllDetailsOfOneCreatedUrl)
.patch(isOwner_auth,handleChangeActiveStatusOfCreatedUrl)
.delete(isOwner_auth,handleDeleteCreatedUrl)




module.exports = router;