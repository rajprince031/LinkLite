const Feedback = require("../models/feedback_models");

async function handleFeedbackPostRequest(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ status: false, error: `Email field are missing` });
    const feedback = new Feedback(req.body);
    await feedback.save();
    return res.status(200).json({
      status: true
    });
  } catch (err) {
    return res.status(500).json({ status: false, error: `Error :- ${err}` });
  }
}

module.exports = {
    handleFeedbackPostRequest
}
