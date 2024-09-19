import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const UserProfile = ()=>{

    let [user, setUser] = useState({});
    let navigate = useNavigate();
    useEffect(()=>{
        user = fetch('http://localhost:8000/user/user-profile',{
            method:"GET",
            headers:{
                authorization : localStorage.getItem('authToken')
            }
        })
        .then((res)=>res.json())
        .then(res=>{
            console.log("Printing the user ",res.userProfile)
            setUser(res.userProfile)
            return res.userProfile
        })
        .catch(err=>{
            console.log('something went wrong')
        })
    },[])
    const handleLogoutRequest=()=>{
        localStorage.removeItem('authToken');
        navigate('/')
    }

    return (
        <div className="main_user_profile_container">
            <h3>First Name :- {user.firstName}</h3>
            <h3>Last Name :- {user.lastName  || 'undefined'}</h3>
            <h3>email :- {user.email}</h3>
            <h3><button onClick={handleLogoutRequest}>Logout</button></h3>
        </div>
    )
}


export default UserProfile