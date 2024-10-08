import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Loader from "../component/loader";


function IsLoginRoute(){
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const authToken = localStorage.getItem('authToken')
    useEffect(()=>{
        if(!authToken) return setIsLogin(false);
        axios.get(`${LOCALHOST_API}/auth/user`,{
            headers:{
                Authorization : authToken
            }
        }).then(()=>{
         return navigate('/dashboard')
        }).catch(err => setIsLogin(false))
    },[])
    return isLogin ? 
    <Loader/> : <Outlet/>
}
     



export default IsLoginRoute