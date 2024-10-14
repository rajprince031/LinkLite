import "../style/logInStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDetails } from "../redux/slices/UserDetails";
import axios from "axios";
const LogInPage = () => {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const dispatch = useDispatch();
    const [user, updateUser] = useState({
        email: "",
        password: "",
    });
    const moveToSignUpPage = () => {
        navigate("/signup");
    };

    const handleLogInRequest = async () => {
        try {

            axios.post(`${LOCALHOST_API}/user/login`,user,{
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res)=>{
                localStorage.setItem("authToken", res.data.authToken);
                dispatch(userDetails(res.data.user))
                window.location.replace(
                    pathname === "/dashboard" || !search
                        ? "/dashboard"
                        : `${pathname}${search}`);
                return toast.success(res.data.msg)
            })
            .catch(error=>toast.error(res.data.error))
            const response = await fetch(`${LOCALHOST_API}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

        } catch (error) {
            console.log("Error during LogIn : - ", error);
            return toast.error('Something went wrong')
        }
    };

    return (
        <div className="main_login_container">
            <h1>Hello I am LogIn Page</h1>
            <label>Email Address</label>
            <input
                placeholder="Email Address"
                value={user.email}
                onChange={(e) => updateUser({ ...user, email: e.target.value })}
            ></input>
            <label>Password</label>
            <input
                placeholder="Password"
                value={user.password}
                onChange={(e) => updateUser({ ...user, password: e.target.value })}
            ></input>
            <button onClick={handleLogInRequest}>Login</button>
            <br />
            <h4 onClick={moveToSignUpPage}>Create account</h4>
        </div>
    );
};

export default LogInPage;
