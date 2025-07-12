const express = require('express');
const router = express.Router();

const {handleFeedbackPostRequest} = require("../controller/feedback_controller");

router.post('/sendMessage',handleFeedbackPostRequest);

module.exports = router;