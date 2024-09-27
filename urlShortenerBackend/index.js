const express = require("express");
const connectMongoDB = require("./db/connection")
const urlRoutes = require("./routes/url_routes")
const userRoutes = require("./routes/user_routes")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly} = require("./Middleware/login_auth");
const { redirectRoute } = require("./routes/redirect_url_route");
const authLoginRoute = require("./routes/auth_isLogin")
require('dotenv').config()

const PORT = process.env.PORT;

const app = express();
app.use(cookieParser())
//connect with mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/url-shotener")
.then(()=>{console.log("MongoDB connected successfully")})
.catch((error)=>{console.log("error while connecting with MongoDB", error)})


// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: process.env.frontend_URL,  // Allow requests from this origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],         // Allow specific methods
    credentials:true
    // allowedHeaders: ['Content-Type']  // Allow specific headers
  }));
  
//MiddleWare

app.use(express.json());
app.use(express.urlencoded({extended:false}))


//Routes
app.use('/',redirectRoute)
app.use('/auth',restrictToLoggedInUserOnly,authLoginRoute)
app.use('/url', restrictToLoggedInUserOnly, urlRoutes);
app.use('/user',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}\n${process.env.localhost_URL}`);
})


