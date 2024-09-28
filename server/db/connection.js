const mongoose = require("mongoose")

async function connectMongoDB(url){
    return mongoose.connect(url).then(()=>{console.log("MongoDB connected successfully")})
    .catch((error)=>{console.log("error while connecting with MongoDB", error)})
}

module.exports = connectMongoDB;