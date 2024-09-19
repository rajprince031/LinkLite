const express = require("express")
const {restrictToLoggedInUserOnly} = require('../Middleware/login_auth');
const router = express.Router();

const {
    handleSignUpRequest,
    handleLoginRequest,
    handleUserProfile
} = require("../controller/user_controller")

router.post('/signup',handleSignUpRequest);
router.post('/login',handleLoginRequest);
router.get('/user-profile',restrictToLoggedInUserOnly, handleUserProfile);

module.exports = router;