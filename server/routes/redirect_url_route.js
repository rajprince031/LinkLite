const express = require("express")

const redirectRoute = express.Router();
const {getAllUserInfo} = require('../Middleware/getUserInfo')
const {handleUrlRedirect} = require("../controller/url_controller")


redirectRoute.get("/:shortId", getAllUserInfo, handleUrlRedirect)

module.exports = {
    redirectRoute
}