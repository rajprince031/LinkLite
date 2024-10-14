import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "../component/loader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userDetails } from "../redux/slices/UserDetails";
const IsAuthRoute = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return 
    }
    axios.get(`${LOCALHOST_API}/auth/user`, {
      headers: {
        Authorization: authToken
      }
    })
      .then((res) => {
        dispatch(userDetails(res.data.user))
         setIsLogin(true)
      })
      .catch((err) => {
        console.log('Error in IsAuthRoute : \n', err)
        navigate('/login');
        return
      })
  }, [])

  return (
    !isLogin ? <Loader /> : <Outlet/>
  )


};

export default IsAuthRoute;
