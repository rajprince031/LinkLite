import "../style/logInStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const LogInPage = () => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const [user, updateUser] = useState({
        email: "",
        password: "",
    });
    const moveToSignUpPage = () => {
        navigate("/signup");
    };

    const handleLogInRequest = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const { status } = response;
            if (status === 200) {
                alert("Logged In Successfully");
                const { authToken } = await response.json();
                localStorage.setItem("authToken", authToken);
                window.location.href =
                    pathname === "/dashboard" || !search
                        ? "/dashboard"
                        : `${pathname}${search}`;
            }
            else if (status === 401) alert("Invalid eamil and password");
            else if (status === 400) alert("Required field are missing");
            else alert("Something went wrong");

        } catch (error) {
            console.log("Error during LogIn : - ", error);
        }
    };

    return (
        <div className="main_login_container">
            <h1>Hello I am LogIn Page</h1>
            <label>Email Address</label>
            <input
                palceholder="Email Address"
                value={user.email}
                onChange={(e) => updateUser({ ...user, email: e.target.value })}
            ></input>
            <label>Password</label>
            <input
                palceholder="Password"
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
