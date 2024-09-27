const mongoose = require("mongoose");
const User = require("./user_model.js");
const Schema = mongoose.Schema;
const urlSchema = Schema(
    {
        title : {
            type: String,
            required: true,
        },
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        activeStatus:{
            type : Boolean,
            default : false,
        },
        vistedHistory: [
            { 
                dateTime: { 
                    type: Date, 
                    default: new Date(),
                },
                ip : {
                    type : String,
                },
                hostname : {
                    type : String
                },
                
            }
        ],
    },
    { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;