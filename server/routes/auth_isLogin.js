const express = require('express');

const authLoginRoute = express.Router();
const {authIsLogin} = require('../controller/authIsLogin_controller')

authLoginRoute.get('/user',authIsLogin)



module.exports = authLoginRoute

