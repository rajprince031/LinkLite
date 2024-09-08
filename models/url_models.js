const mongoose = require("mongoose")
const User = require("./user_model.js")
const Schema = mongoose.Schema;
const urlSchema = Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL :{
        type:String,
        required:true,
    },
    creator :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        require :  true
    },
    vistedHistory : [{timestamps : {type:Number}}]
},{timestamps:true})

const URL = mongoose.model('url',urlSchema);

module.exports = URL ;