import '../style/signUpStyle.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LOCALHOST_API } from '../utils/constant';

const SingUpPage =()=>{
    const navigate = useNavigate();
    const [user ,updateUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    });

    const handleSignUpRequest = async()=>{

        try{
        const response = await fetch(`${LOCALHOST_API}/user/signup`,{
            method:"POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        const {status} = response;

        if(status === 201){
            alert("Registration successfully");
            navigate('/login');
        }else if(status === 400){
            alert("Required Field are missing\nYou must enter First Name , Email and Password");
        }else if(status === 409){
            alert("This Email is already exits");
        }else{
            alert("Something went wrong try again");
        }
        }catch(error){
            console.log("Error occur during signup",error);
        }
    }
    const moveToLogInPage =()=>{
        navigate('/login')
    }

    return (
        <div className="main_sigup_container"> 
            <h1>Hello I am Signup Page</h1>
            <label>First Name</label>
            <input 
            placeholder="First Name"
            value = {user.firstName} 
            onChange={e => updateUser({...user,firstName : e.target.value})}
            ></input>

            <label>Last Name</label>
            <input
            placeholder = 'Last Name'
            value = {user.lastName}
            onChange={e=>updateUser({...user,lastName:e.target.value})}
            ></input>

            <label>Email Address</label>
            <input
            placeholder="Email Address"
            value={user.email}
            onChange={e=>updateUser({...user,email:e.target.value})}
            ></input>

            <label>Password</label>
            <input
            placeholder='Password'
            value={user.password}
            onChange={e=>updateUser({...user,password:e.target.value})}
            ></input>

            <button onClick={handleSignUpRequest}>SignUp</button>
            <br/>
            <h4 onClick={moveToLogInPage}>Already singnup? Login</h4>
        </div>
    )
}

export default SingUpPage;