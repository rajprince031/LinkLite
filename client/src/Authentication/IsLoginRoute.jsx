import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Loader from "../component/loader";
import { userDetails } from "../redux/slices/UserDetails";
import { useDispatch, useSelector } from "react-redux";


function IsLoginRoute(){
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const authToken = localStorage.getItem('authToken')
    useEffect(()=>{
        if(!authToken) {
            setIsLogin(false)
            return 
        }
        axios.get(`${LOCALHOST_API}/auth/user`,{
            headers:{
                Authorization : authToken
            }
        }).then((res)=>{
            dispatch(userDetails(res.data.user))
            navigate('/dashboard')
            return 
        }).catch(err => setIsLogin(false))
    },[])

    return isLogin ? <Loader/> : <Outlet/>
}
     



export default IsLoginRoute