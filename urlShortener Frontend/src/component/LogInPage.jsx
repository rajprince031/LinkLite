
import '../style/logInStyle.css';
import { useNavigate } from 'react-router-dom';


const LogInPage=()=>{

    const navigate = useNavigate();

    const moveToSignUpPage =()=>{
        navigate('/signup')
    }


    return(
        <div className="main_login_container">
            <h1>Hello I am LogIn Page</h1>
            <label>Email Address</label>
            <input></input>
            <label>Password</label>
            <input></input>
            <button>Login</button>
            <br/>
            <h4 onClick={moveToSignUpPage}>Create account</h4>
        </div>
    )
}

export default LogInPage;