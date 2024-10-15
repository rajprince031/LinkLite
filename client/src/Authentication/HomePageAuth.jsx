import axios from "axios";
import { useEffect } from "react";
import { Outlet} from "react-router-dom";
import { userDetails } from "../redux/slices/UserDetails";
import { useDispatch } from "react-redux";


function HomePageAuth(){
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const dispatch = useDispatch();
    const authToken = localStorage.getItem('authToken')
    useEffect(()=>{
        if(!authToken) {
            return 
        }
        axios.get(`${LOCALHOST_API}/auth/user`,{
            headers:{
                Authorization : authToken
            }
        }).then((res)=>{
            dispatch(userDetails(res.data.user))
        }).catch(err => console.log("I am HomeAuth : ",err))
    },[])

    return <Outlet/>
}
     
export default HomePageAuth