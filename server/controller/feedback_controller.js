const feedback_model = require("../models/feedback_models");

async function handleFeedbackPostRequest(req, res){
    const {name, email, message} = req.body;
    if(!email) return res.status(400).json({ status: false, error: `Email field are missing` });
    return res.status(400).json({ status: false, error: `not complete function` });
}