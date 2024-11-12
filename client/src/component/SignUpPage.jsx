import '../style/signUpStyle.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from './Spinner';

const SingUpPage = () => {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;

    const navigate = useNavigate();
    const [isSpinner,setIsSpinner] = useState(false)
    const [user, updateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleSignUpRequest = async () => {
            setIsSpinner(true)
        try {
            axios.post(`${LOCALHOST_API}/user/signup`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(res => {
                toast.success("Registration successfully");
                setIsSpinner(false)
                updateUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
                return
            }).catch(err => {
                setIsSpinner(false)

                console.log("printing err : ", err);
                toast.error(err.response.data.error)
            })
        } catch (error) {

            setIsSpinner(false)
            console.log("I am signup Page ",error)
            toast.error('something went wrong')
            return;
        }
    }
    const moveToLogInPage = () => {
        navigate('/login')
    }

    return (
        <div className="main_sigup_container">
            <div className="navbar_container">
                <div className='title_name'>
                    <p>LinkLite</p>
                    <div className='bubble-left'>
                        Experience it now!
                    </div>
                </div>
            </div>
            <div className="signup_inner_conatainer">
                <div className="image_and_login_btn">
                    <div className="signup_image_box1">
                    </div>
                    <div className='signup_login_btn'>
                        <button class="btn"
                            onClick={moveToLogInPage}>Already with us? Log in
                        </button>
                    </div>
                </div>

                <div className="signup_container">
                    <div className='heading'>
                        <p className='main_heading'>Excited to have you here!</p>
                        <p className='sub_heading'> Let's set up your account.</p>

                    </div>
                    <div className='register_box'>
                        <input
                            className='input'
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={e => updateUser({ ...user, firstName: e.target.value })}
                        ></input>

                        <input
                            className='input'

                            placeholder='Last Name'
                            value={user.lastName}
                            onChange={e => updateUser({ ...user, lastName: e.target.value })}
                        ></input>

                        <input
                            className='input'
                            placeholder="Username"
                            value={user.email}
                            onChange={e => updateUser({ ...user, email: e.target.value })}
                        ></input>

                        <input
                            className='input'
                            type='password'
                            placeholder='Password'
                            value={user.password}
                            onChange={e => updateUser({ ...user, password: e.target.value })}
                        ></input>
                        <p className='password_description'>Password must be at least 8 characters long, contain both letters and numbers.</p>
                        <div className='signup_btn'>
                            {isSpinner && <Spinner/>}
                            {!isSpinner && <button onClick={handleSignUpRequest}>SignUp</button>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='signature'>
                <p>© 2024 LINKLITE. All rights reserved.</p>
                <p>Created by <strong>Prince Raj</strong></p>
            </div>
        </div>
    )
}

export default SingUpPage;