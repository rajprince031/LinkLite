import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "../component/loader";
import axios from "axios";
const IsAuthRoute = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const [isLogin, setIsLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  useEffect(() => {
    if (!authToken) return navigate('/login');
    axios.get(`${LOCALHOST_API}/auth/user`, {
      headers: {
        Authorization: authToken
      }
    })
      .then((res) => {
        setUserDetails(res.data.user);
        return setIsLogin(true)
      })
      .catch((err) => {
        console.log('Error in IsAuthRoute : \n', err)
        return navigate('/login');
      })
  }, [])

  return (
    !isLogin ? <Loader /> : <Outlet />
  )


};

export default IsAuthRoute;
