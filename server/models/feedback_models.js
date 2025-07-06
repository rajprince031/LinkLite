const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    name:{
        type : String,
        default : "UNKNOWN"
    },
    email:{
        type : String,
        require : true,
        unique : true,
        lowercase : true,
        trim:true
    },
    message:{
        type:String,
        default:"NO MESSAGE"
    }
})

const feedback = mongoose.model("feedback",feedbackSchema);

module.exports = feedback;