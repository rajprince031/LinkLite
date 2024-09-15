import { useEffect, useState } from "react";
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
import LogInPage from "../component/LogInPage";

const IsAuthRoute = (props) => {
  const { component: Component, path } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authURL = "http://localhost:8000/url/url-shortener";
    const authToken = localStorage.getItem("uid");
    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }
    fetch(authURL, {
      method: "GET",
      headers: {
        Authorization: authToken,
      },
    })
      .then((res) => {
        console.log("I am printing the response hello hello : -", res.status);
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
