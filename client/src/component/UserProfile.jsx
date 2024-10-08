import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import '../style/UserProfile.css';
import ChangePasswordDialogBox from "./ChangePasswordDialogBox";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {

      const navigate = useNavigate();
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const [user , setUser] = useState({});
    // console.log("userrrrrr",userDetails)
    useEffect(()=>{
        // setUser(userDetails)
    },[])
    const handleLogoutRequest = () => {
        localStorage.removeItem('authToken');
        navigate('/')
    }
    

    return (
        <div className="main_user_profile_container">
            <div>
                <div>
                    <h3>Name :- {user?.name}</h3>
                    <h3>Email :- {user?.email}</h3>
                </div>

                <div className='buttons'>
                    <UpdateProfile fName={user?.firstName} lName={user?.lastName} eMail={user?.email}/>
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