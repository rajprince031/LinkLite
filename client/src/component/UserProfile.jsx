import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../style/UserProfile.css';
import ChangePasswordDialogBox from "./ChangePasswordDialogBox";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;


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
                setUser(res.userProfile)
                return res.userProfile
            })
            .catch(err => {
                alert('something went wrong')
            })
    }, [user])
    const handleLogoutRequest = () => {
        localStorage.removeItem('authToken');
        navigate('/')
    }
    

    return (
        <div className="main_user_profile_container">
            <div>
                <div>
                    <h3>Name :- {user.fullName}</h3>
                    <h3>Email :- {user.email}</h3>
                </div>

                <div className='buttons'>
                    <UpdateProfile fName={user.firstName} lName={user.lastName} eMail={user.email}/>
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