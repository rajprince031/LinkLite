const express = require("express");
const connectMongoDB = require("./db/connection")
const urlRoutes = require("./routes/url_routes")
const userRoutes = require("./routes/user_routes")
const cors = require('cors')
const PORT = 8000;

const app = express();

//connect with mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/url-shotener")
.then(()=>{console.log("MongoDB connected successfully")})
.catch((error)=>{console.log("error while connecting with MongoDB")})


// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],         // Allow specific methods
    // allowedHeaders: ['Content-Type']  // Allow specific headers
  }));
  
//MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/',urlRoutes);
app.use('/user',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}\nhttp://localhost:${PORT}`);
})


