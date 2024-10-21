import "../style/logInStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDetails } from "../redux/slices/UserDetails";
import axios from "axios";
import Spinner from "./Spinner";
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
            <div className="navbar_container">
                <div className='title_name'>
                    <p>LinkLite</p>
                    <div className='bubble-left'>
                        Experience it now!
                    </div>
                </div>
            </div>
            <div className="login_sigup_box">
                <div className="full_left_box">
                    <div className="login_box">
                        <div className="heading">
                            <p className="main_heading">Let’s Get You Back Onboard!</p>
                            <p className="sub_heading">Please Log In.</p>
                        </div>
                        <div className="input_field">
                            {/* <label className='label'>Email Address</label> */}
                            <input className="input"
                                placeholder="Username"
                                value={user.email}
                                onChange={(e) => updateUser({ ...user, email: e.target.value })}
                            ></input>
                            {/* <label className='label'>Password</label> */}
                            <input className="input"
                                placeholder="Password"
                                value={user.password}
                                type="password"
                                onChange={(e) => updateUser({ ...user, password: e.target.value })}
                            ></input>
                        </div>
                        <div className="login_btnn">
                        {isSpinner && <Spinner/>}

                        {!isSpinner && <button onClick={handleLogInRequest}>Login</button>}
                        </div>
                    </div>
                    <div className="image_box1"></div>
                </div>

                <div className="signup_box">
                    <div className="image_box2"></div>
                    <button
                        className="ui-btn"
                        onClick={moveToSignUpPage}>
                        <p>Be Part of Something Great - </p>
                        <span>
                            Unlock Access!
                        </span>
                    </button>

                </div>
            </div>
            <div className='signature'>
                <p>© 2024 LINKLITE. All rights reserved.</p>
                <p>Created by <strong>Prince Raj</strong></p>
            </div>
        </div>
    );
};

export default LogInPage;
