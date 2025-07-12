import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import '../style/UserProfile.css';
import ChangePasswordDialogBox from "./ChangePasswordDialogBox";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/UserDetails";
import styled from "styled-components";

const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const user = useSelector(state => state.userProfile)
    const dispatch = useDispatch();
    const handleLogoutRequest = () => {
        localStorage.removeItem('authToken');
        dispatch(logout())
        navigate('/')
        return;
    }
    const handleCloseDialogBox = () => {
        setIsOpen(false);
    }
    return (
        <div className="user_profile_template">
            <div onClick={() => setIsOpen(!isOpen)} tabIndex={0} className="popup button" style={{ padding: '0 0.225rem  0', borderTopRightRadius: '1.2rem', borderBottomRightRadius: '1.2rem' }}>
                <div className="user_profile_popup-header">
                    <p style={{ letterSpacing: 1, fontWeight: 600, padding: '0.625rem 0rem 0.625rem 0.825rem' }}>
                        {user.firstName}
                    </p>
                    <svg height={32} width={32} viewBox="0 0 1024 1024" className="icon">
                        <path fill="#FFCE8B" d="M1021.103385 510.551692A510.551692 510.551692 0 1 1 510.551692 0a510.551692 510.551692 0 0 1 510.551693 510.551692" />
                        <path fill="#644646" d="M809.99026 493.192935v315.26567H494.979866a317.052601 317.052601 0 0 1-66.626996-7.147724V493.192935z" />
                        <path d="M494.979866 808.458605h-66.626996v-7.147724a317.052601 317.052601 0 0 0 66.626996 7.147724" />
                        <path fill="#644646" d="M809.99026 493.192935H428.35287v308.117946A315.010394 315.010394 0 0 1 178.693092 493.192935a310.670705 310.670705 0 0 1 21.953723-115.639958A314.755118 314.755118 0 0 1 494.979866 178.693092a308.373222 308.373222 0 0 1 82.96465 11.232138 313.989291 313.989291 0 0 1 232.045744 304.033532" />
                        <path fill="#C7F4F1" d="M758.935091 959.581906a510.551692 510.551692 0 0 1-512.338624-9.18993 268.55019 268.55019 0 0 1 512.338624 9.18993" />
                        <path fill="#F7BEA9" d="M581.263102 727.02561v86.793788a68.924478 68.924478 0 0 1-137.593681 0v-91.133477a184.309161 184.309161 0 0 0 74.285271 15.571826 178.693092 178.693092 0 0 0 63.30841-11.232137" />
                        <path fill="#FBD1BB" d="M700.987474 390.572045v163.121266a195.796574 195.796574 0 0 1-119.724372 183.798609 172.566472 172.566472 0 0 1-137.593681-4.850241 197.072953 197.072953 0 0 1-108.747511-178.693093v-163.376541a189.92523 189.92523 0 0 1 183.032782-195.796574 176.39561 176.39561 0 0 1 129.424854 57.437065 201.667919 201.667919 0 0 1 53.607928 138.359509" />
                        <path fill="#FBD1BB" d="M370.405253 553.182759a43.396894 43.396894 0 1 1-43.396894-41.099411 42.37579 42.37579 0 0 1 43.396894 41.099411" />
                        <path fill="#F49F83" d="M605.769583 590.963584v2.042207a70.966685 70.966685 0 1 1-141.93337 0v-2.042207" />
                        <path fill="#030303" d="M499.064279 517.699416a18.890413 18.890413 0 1 1-18.890412-18.890412 18.890413 18.890413 0 0 1 18.890412 18.890412M619.043927 517.699416a18.890413 18.890413 0 1 1-18.890412-18.890412 18.890413 18.890413 0 0 1 18.890412 18.890412" />
                        <path fill="#644646" d="M796.46064 401.038354a224.387469 224.387469 0 0 1-282.590362-28.590894 224.132193 224.132193 0 0 1-312.202359 5.105517A314.755118 314.755118 0 0 1 494.979866 178.693092a308.373222 308.373222 0 0 1 82.96465 11.232138 316.031498 316.031498 0 0 1 218.516124 211.878952" />
                    </svg>
                </div>

            </div>
            {isOpen &&
                <div className="user_profile_main_popup_box" onClick={handleCloseDialogBox}>
                    <div className="user_profile_popup" onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            <p className="user_profile_button user_profile_item"><UpdateProfile /></p>
                            <p className="user_profile_button user_profile_item"><ChangePasswordDialogBox /></p>
                            <p className="user_profile_button user_profile_item" onClick={handleLogoutRequest}><p>Log out</p></p>
                    </div>
                </div>}
        </div>
    );
}


export default UserProfile;


// return (
//     <div className="main_user_profile_container">
//         <article class="card">
//             <div class="card-img">
//                 <div class="card-imgs pv delete"></div>
//             </div>

//             <div class="project-info">
//                 <div class="flex">
//                     <div class="project-title">{user?.fullName}</div>
//                 </div>
//                 <span class="lighter"
//                 >{user?.email}</span>
//             </div>
//         </article>
//         <div className="all_buttons">

//             <UpdateProfile />
//             <ChangePasswordDialogBox />

//             <div className="logout_button">
//                 <button onClick={handleLogoutRequest} class="Btn">
//                     <div class="sign">
//                         <svg viewBox="0 0 512 512">
//                             <path
//                                 d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
//                             ></path>
//                         </svg>
//                     </div>

//                     <div class="text">Logout</div>
//                 </button>
//             </div>
//         </div>
//     </div>
// )