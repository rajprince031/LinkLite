
import '../style/homeStyle.css';
import {useNavigate} from 'react-router-dom';
import { LOCALHOST_API } from '../utils/constant';
import { useState, useEffect } from 'react';
const HomePage=()=>{
    const navigate = useNavigate();
    const [isLogin, updateIsLogin] = useState(null)
    useEffect(()=>{
        fetch(`${LOCALHOST_API}/auth/user`,{
            method:"GET",
            headers : {
                authorization : localStorage.getItem('authToken')
            }
        }).then(res=>{
            const {status} = res;
            if(status==200){
               return updateIsLogin(true)
            }
            return updateIsLogin(false)

        }).catch(err =>{
            console.log("Something went wrong in Home Page")
            return updateIsLogin(false) 
        })
        console.log("Print",isLogin)

    },[])
    const action = ()=>{
        if(isLogin) navigate('./dashboard');
        else navigate('./login');
    }
    
    return(
        <div className="main_home_container">
            <h1>Welcome to URL - Shortener</h1>
            <h3 onClick={action} className='click_to_jump'>{ isLogin ? ('jump to the Dashboard Page') : ('jump to Login Page')}</h3>
        </div>
    )
}

export default HomePage;