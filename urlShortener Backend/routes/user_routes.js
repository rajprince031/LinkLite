const express = require("express")
const {restrictToLoggedInUserOnly} = require('../Middleware/login_auth');
const router = express.Router();
const { validateSignUpDetails } = require("../Middleware/signup_auth");
const { ValidatePassword, ValidateChangePassword } = require("../Middleware/password_auth")
const {
    handleSignUpRequest,
    handleLoginRequest,
    handleUserProfile,
    handleProfileUpdate,
    handleChangePassword
} = require("../controller/user_controller");

router.post('/signup',validateSignUpDetails,ValidatePassword,handleSignUpRequest);
router.post('/login',handleLoginRequest);
router.get('/user-profile',restrictToLoggedInUserOnly, handleUserProfile);
router.patch('/user-profile/change-password',restrictToLoggedInUserOnly,ValidateChangePassword, handleChangePassword);

module.exports = router;