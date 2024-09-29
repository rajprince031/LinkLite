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

const PORT = process.env.PORT || 10000;

const app = express();
app.set('trust proxy',true);
app.use(cookieParser())
//connect with mongoDB
connectMongoDB(process.env.MONGODB_URI)



// Configure CORS to allow requests from your frontend
app.use(cors({
  origin:process.env.frontend_URL,
  methods:["POST","GET","PATCH","DELETE"],
  credentials: true
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


