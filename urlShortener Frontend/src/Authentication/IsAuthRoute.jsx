import { useEffect, useState } from "react";
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
import LogInPage from "../component/LogInPage";
import {LOCALHOST_API} from '../utils/constant';
const IsAuthRoute = (props) => {
  const { component: Component, path } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authURL = `${LOCALHOST_API}/url/url-shortener`;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }
    fetch(authURL, {
      method: "GET",
      headers: {
        authorization: authToken,
      },
    })
      .then((res) => {
        if (res.status === 200) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      })
      .catch((error) => setIsAuthenticated(false));
  }, []);

  return isAuthenticated === null ? null :(
    <Routes>
      {isAuthenticated ? <Route path={path} Component={Component} /> : <Route path={path} Component={LogInPage} />}
    </Routes>
  )
  
};

export default IsAuthRoute;
