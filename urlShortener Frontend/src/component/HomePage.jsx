
import '../style/homeStyle.css';
import {useNavigate} from 'react-router-dom';
const HomePage=()=>{
    const navigate = useNavigate();
    const action = ()=>{
        navigate('./login');
    }

    return(
        <div className="main_home_container">
            <h1>Welcome to URL - Shortener</h1>
            <h3 onClick={action}>Click to jump to the Login Page</h3>
        </div>
    )
}

export default HomePage;