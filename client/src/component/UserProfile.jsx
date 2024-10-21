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
    const user = useSelector(state => state.userProfile)
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
            <article class="card">
                <div class="card-img">
                    <div class="card-imgs pv delete"></div>
                </div>

                <div class="project-info">
                    <div class="flex">
                        <div class="project-title">{user?.fullName}</div>
                    </div>
                    <span class="lighter"
                    >{user?.email}</span>
                </div>
            </article>
            <div className="all_buttons">

                <UpdateProfile />
                <ChangePasswordDialogBox />

                <div className="logout_button">
                    <button onClick={handleLogoutRequest} class="Btn">
                        <div class="sign">
                            <svg viewBox="0 0 512 512">
                                <path
                                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                ></path>
                            </svg>
                        </div>

                        <div class="text">Logout</div>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default UserProfile