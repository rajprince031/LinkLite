import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import '../style/UserProfile.css';
import ChangePasswordDialogBox from "./ChangePasswordDialogBox";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/UserDetails";

const UserProfile = () => {

    const navigate = useNavigate();
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const user = useSelector(state=>state.userProfile)
    console.log("Current user data ", user)
    const dispatch = useDispatch();
    const handleLogoutRequest = () => {
        localStorage.removeItem('authToken');
        dispatch(logout())
        navigate('/')
        return;
    }
    
    return (
        <div className="main_user_profile_container">
            <div>
                <div>
                    <h3>Name :- {user?.fullName}</h3>
                    <h3>Email :- {user?.email}</h3>
                </div>

                <div className='buttons'>
                    <UpdateProfile />
                    <ChangePasswordDialogBox/>
                </div>
                
                <br/>
                <div className="logout_button">
                    <button onClick={handleLogoutRequest}>Logout</button>
                </div>
            </div>
        </div>
    )
}


export default UserProfile