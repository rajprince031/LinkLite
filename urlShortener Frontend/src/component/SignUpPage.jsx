import '../style/signUpStyle.css';
import { useNavigate } from 'react-router-dom';
const SingUpPage =()=>{
    const navigate = useNavigate();

    const moveToLogInPage =()=>{
        navigate('/login')
    }

    return (
        <div className="main_sigup_container"> 
            <h1>Hello I am Signup Page</h1>
            <label>First Name</label>
            <input></input>

            <label>Last Name</label>
            <input></input>

            <label>Email Address</label>
            <input></input>

            <label>Password</label>
            <input></input>

            <button>SignUp</button>
            <br/>
            <h4 onClick={moveToLogInPage}>Already singnup? Login</h4>
        </div>
    )
}

export default SingUpPage;