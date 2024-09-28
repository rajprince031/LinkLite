const express = require("express")

const redirectRoute = express.Router();

const {handleUrlRedirect} = require("../controller/url_controller")


redirectRoute.get("/:shortId",handleUrlRedirect)

module.exports = {
    redirectRoute
}