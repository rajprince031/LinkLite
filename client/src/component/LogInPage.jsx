import "../style/logInStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDetails } from "../redux/slices/UserDetails";
import axios from "axios";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import Footer from "./Footer";
const LogInPage = () => {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const dispatch = useDispatch();
    const [isSpinner, setIsSpinner] = useState(false);
    const [user, updateUser] = useState({
        email: "",
        password: "",
    });
    const moveToSignUpPage = () => {
        navigate("/signup");
    };

    const handleLogInRequest = async () => {
        console.log("I am handleLogInRequest function")
        try {
            setIsSpinner(true);

            axios.post(`${LOCALHOST_API}/user/login`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    localStorage.setItem("authToken", res.data.authToken);
                    dispatch(userDetails(res.data.user))
                    setIsSpinner(false)
                    window.location.replace(
                        pathname === "/dashboard" || !search
                            ? "/dashboard"
                            : `${pathname}${search}`);
                    return toast.success(res.data.msg)
                })
                .catch(error => {
                    setIsSpinner(false)

                    toast.error(error.response.data.error)
                })
        } catch (error) {
            setIsSpinner(false)
            console.log("Error during LogIn : - ", error);
            return toast.error('Something went wrong')
        }
    };

    return (
        <div className="main_login_container">
            <div className="navbar__logo" onClick={() => { navigate("/"); closeMenu(); }}>
                <p>LinkLite</p>
                <div className="bubble-left">Experience it now!</div>
            </div>
            <div className="form_container" >
                <div className="title_container">
                    <p className="title">Login to your Account</p>
                    <span className="subtitle">
                        Get started with our app, just create an account and enjoy the experience.
                    </span>
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="email_field">Username</label>
                    <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.942 10.239C11.657 11.253 12.343 11.253 14.058 10.239L17 8.5" />
                        <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.016 13.476C2.081 16.541 2.114 18.074 3.245 19.209C4.376 20.345 5.95 20.384 9.099 20.463C11.039 20.512 12.961 20.512 14.901 20.463C18.05 20.384 19.624 20.345 20.755 19.209C21.886 18.074 21.919 16.541 21.984 13.476C22.005 12.49 22.005 11.51 21.984 10.524C21.919 7.459 21.886 5.926 20.755 4.791C19.624 3.655 18.05 3.616 14.901 3.537C12.961 3.488 11.039 3.488 9.099 3.537C5.95 3.616 4.376 3.655 3.245 4.791C2.114 5.926 2.081 7.459 2.016 10.524C1.995 11.51 1.995 12.49 2.016 13.476Z" />
                    </svg>
                    <input 
                    value={user.email} 
                    onChange={(e) => updateUser({ ...user, email: e.target.value })}
                    placeholder="username" 
                    type="text" 
                    className="input_field" 
                     />
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="password_field">Password</label>
                    <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M18 11.004C17.417 9.917 16.273 9.158 14.952 9.099C13.477 9.034 11.979 9 10.329 9C8.679 9 7.181 9.034 5.706 9.099C3.953 9.177 2.513 10.488 2.279 12.162C2.126 13.254 2 14.373 2 15.513C2 16.653 2.126 17.773 2.279 18.865C2.513 20.539 3.953 21.85 5.706 21.928C6.42 21.959 7.26 21.983 8 22" />
                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M6 9V6.5C6 4.015 8.015 2 10.5 2C12.985 2 15 4.015 15 6.5V9" />
                        {/* (Optional) lock or eye SVG path continued */}
                    </svg>
                    <input 
                    value={user.password}
                    onChange={(e) => updateUser({ ...user, password: e.target.value })}
                    placeholder="Password" 
                    type="password" 
                    className="input_field" 
                     />
                </div>
                <button onClick={handleLogInRequest} className="sign-in_btn">
                   {isSpinner && <span><Spinner/></span>}
                   { !isSpinner && <span>Sign In</span> }
                </button>

                <p className="note" onClick={moveToSignUpPage}>Don’t have an account? <strong>Sign up</strong></p>
            </div>
            <div className="login_page_footer">
                <p>© 2024 LINKLITE. All rights reserved.</p>
            </div>
        </div>
    );
};

export default LogInPage;
