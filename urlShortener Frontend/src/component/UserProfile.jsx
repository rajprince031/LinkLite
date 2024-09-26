import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LOCALHOST_API } from "../utils/constant";
import '../style/UserProfile.css';
import ChangePasswordDialogBox from "./ChangePasswordDialogBox";

const UserProfile = () => {

    let [user, setUser] = useState({});
    let navigate = useNavigate();
    useEffect(() => {
        user = fetch(`${LOCALHOST_API}/user/user-profile`, {
            method: "GET",
            headers: {
                authorization: localStorage.getItem('authToken')
            }
        })
            .then((res) => res.json())
            .then(res => {
                console.log("Printing the user ", res.userProfile)
                setUser(res.userProfile)
                return res.userProfile
            })
            .catch(err => {
                console.log('something went wrong')
            })
    }, [])
    const handleLogoutRequest = () => {
        localStorage.removeItem('authToken');
        navigate('/')
    }
    //Edit Profile
    const handleEditProfileRequest=()=>{
        return null;

    }

    return (
        <div className="main_user_profile_container">
            <div>
                <div>
                    <h3>Name :- {user.fullName}</h3>
                    <h3>Email :- {user.email}</h3>
                </div>

                <div className='buttons'>
                    <button onClick={handleEditProfileRequest}>Edit Profile</button>
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