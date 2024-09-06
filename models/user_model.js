const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true,
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    }
},{timestamps:true})


const user = mongoose.model('user',userSchema);
module.exports = user;