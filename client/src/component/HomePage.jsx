import '../style/homeStyle.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
const HomePage = () => {
    const navigate = useNavigate()
    const {firstName} = useSelector(state=>state.userProfile)
    const [text, setText] = useState("loading...");

    // console.log("I am home page ",text);
    
    useEffect(()=>{
        if(!firstName) setText("Log in");
        else setText(firstName);
    },[])
    const logInBtn = () => {
        navigate('./login')
        return
    }
    const signUpBtn = () => {
        navigate('./signup')
        return
    }

    return (
        <div className='main_home_container'>
            <div className="navbar_container">
                <div className='title_name'>
                    <p onClick={()=>navigate('/')}>LinkLite</p>
                    <div className='bubble-left'>
                        Experience it now!
                    </div>
                </div>
                    <button className='login_btn_home_page' onClick={logInBtn}>{text}</button>
            </div>
            <div className='body_container'>
                <div className='description_container'>
                    <div className='welcome_container'>
                        <p className='main_heading'>Shorten your links today!</p>
                        <p className='description'>
                            The LinkLite Application turns long URLs into short links and tracks
                            user details like IP addresses, device info, and access timestamps.
                        </p>
                    </div>
                    <button onClick={signUpBtn} className='join_btn'>
                        Unlock short links!
                    </button>
                    <div className='tag_line_container'>
                        <p className='bottom_line'>Shorten, Share, and Track with Ease!</p>
                    </div>
                </div>
                <div className='image_container'>

                </div>

            </div>

            <div className='main_key_features_container'>
                <div className="title_key_features">Key Features</div>
                <div className='key_features_container'>
                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='auth_icon'></div>
                                User Authentication
                            </div>
                            <p>Easy account management with sign-up and login capabilities.</p>
                        </div>
                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='short_icon'></div>
                                URL Shortening
                            </div>
                            <p>Simple interface for converting long URLs into short links.</p>
                        </div>
                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='simple_api_icon'></div>
                                Simple API
                            </div>
                            <p>Easy-to-use endpoints for shortening URLs and tracking interactions.</p>
                        </div>
                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='management_icon'></div>
                                URL Management
                            </div>
                            <p>View, edit, or delete created links seamlessly.</p>
                        </div>


                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='storage_icon'></div>
                                Persistent Storage
                            </div>
                            <p>Reliable access to shortened URLs stored in a MongoDB database.</p>
                        </div>
                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='redirect_icon'></div>
                                URL Redirection
                            </div>
                            <p>Automatic redirection from short URLs to original links.</p>
                        </div>

                        <div class="feature_container">
                            <div className='feature_name'>
                                <div className='analytics_icon'></div>
                                User Analytics
                            </div>
                            <p>Capture user data like IP addresses and device info for insights.</p>
                        </div>


                        <div class="blank_space" >

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

export default HomePage
