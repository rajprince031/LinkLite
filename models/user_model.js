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
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        require : true,
        minlength : 8,
    }
},{timestamps:true})


const user = mongoose.model('user',userSchema);
module.exports = user;