const express = require("express");
const connectMongoDB = require("./db/connection")
const urlRoutes = require("./routes/url_routes")
const PORT = 8000;

const app = express();

//connect with mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/url-shotener")
.then(()=>{console.log("MongoDB connected successfully")})
.catch((error)=>{console.log("error while connecting with MongoDB")})


//routes
app.use(express.json());
app.use('/url',urlRoutes);

//redirected website
app.use('/',urlRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}\nhttp://localhost:${PORT}`);
})


