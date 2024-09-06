const express = require("express")

const router = express.Router();

const {
    handleSignUpRequest,
    handleLoginRequest
} = require("../controller/user_controller")

router.post('/signup',handleSignUpRequest);
router.post('/login',handleLoginRequest);

module.exports = router;