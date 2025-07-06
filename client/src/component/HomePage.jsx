import '../style/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import { Element } from 'react-scroll';
import Footer from './Footer';
const HomePage = () => {
    const navigate = useNavigate()
    const { firstName } = useSelector(state => state.userProfile)
    const [text, setText] = useState();

    useEffect(() => {
        if (!firstName) setText("Log in");
        else setText(firstName);
    }, [])
    const logInBtn = () => {
        navigate('./login')
        return
    }
    const signUpBtn = () => {
        navigate('./signup')
        return
    }

    return (
        <div className='home_page_main_container'>
            <Navbar name={text} />
            <Element name="home" className="section home">
                <div className='home_container'>
                    <h1 className='healine'>What will you
                        <br />
                        <strong>shorten</strong> today?</h1>
                    <p className='description'>
                        LinkLite helps you shorten long URLs,
                        monitor click performance, create custom short links,
                        and control access—all through a clean, powerful,
                        and easy-to-use platform.</p>
                    <button onClick={signUpBtn} className='join_btn'>
                        <span>Start with LinkLite – It’s Free</span>
                    </button>
                    <p onClick={logInBtn} className='already_join_btn'>{!firstName && "Already have an account? Log in"}</p>
                </div>
            </Element>
            <hr className="section-divider" />

            <Element name="about" className="section about">
                <AboutPage/>
            </Element>
            <hr className="section-divider" />

            <Element name="contact" className="section contact">
                <ContactPage/>
            </Element>
            <Footer/>
        </div>
    )
}

export default HomePage;
