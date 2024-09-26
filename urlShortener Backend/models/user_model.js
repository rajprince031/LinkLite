const mongoose = require("mongoose");
const cryptoJs = require("crypto-js");
const { v4 : uuidv4 } = require('uuid');
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
    encryptPassword : {
        type : String,
        require : true,
    },
    salt:{
        type : String,
        require : true,
    }
},
{
    toJSON:{virtuals:true},
    timestamps:true
})

userSchema.virtual('password')
.set(function(password){
    this.salt = uuidv4();
    this.encryptPassword = cryptoJs.HmacSHA1(password,this.salt).toString();
})

userSchema.virtual('fullName').get(function(){
    return this.firstName+" "+this.lastName;
})

userSchema.methods = {
    authenticate : function(planPassword){
       return cryptoJs.HmacSHA1(planPassword,this.salt).toString() === this.encryptPassword;
    }
}

const user = mongoose.model('user',userSchema);
module.exports = user;