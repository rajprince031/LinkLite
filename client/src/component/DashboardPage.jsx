import axios from "axios";
import "../style/dashboardStyle.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteCreatedURL from "./DeleteCreatedURL";
import ChangeActiveStatusOfURL from "./ChangeActiveStatusOfURL";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import GenerateLink from "./GenerateLink";
import Spinner from "./Spinner";

const Dashboard = () => {
  const details = useSelector(state => state.userProfile);
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const apiURL = LOCALHOST_API;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);


  const [urls, updateUrls] = useState([]);
  const [total, setTotal] = useState({
    totalClicks: 0,
    totalURL: 0
  });

  const [userURL, updateUserURL] = useState({
    title: "",
    authToken,
    redirectURL: "",
    activeStatus: true,
  });

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${LOCALHOST_API}/url/url-shortener`, {
      headers: {
        Authorization: authToken
      }
    })
      .then((res) => {
        updateUrls(res.data)
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);

        toast.error('Something went wrong')
      })

  }, []);

  useEffect(() => {
    let sum = 0;
    urls.forEach(val => { sum += val.vistedHistory.length });
    setTotal({ totalURL: urls.length, totalClicks: sum });
  }, [urls]);

  //Update Url List after creating new url
  const addingNewUrl = (newUrl) => {
    updateUrls([...urls, newUrl])
  }


  const navigateToViewDetailsPage = (urlId) => {
    navigate(`/dashboard/view-details`, { state: { urlId } });
  };

  const ChangeStatusOfURL = (isActive, _id, activeStatus, title) => {
    if (isActive) {
      updateUrls(urls.map(val => {
        if (val._id === _id) val.activeStatus = activeStatus;
        return val;
      }))
      toast.success(`${title} is ${activeStatus ? 'Actived' : 'Deactived'}`);
    }
  };

  const deleteTheCreatedShortURL = (isDelete, id, title) => {
    if (isDelete) {
      toast.success(`${title} Deleted Successfully`);
      updateUrls(urls.filter(val => val._id !== id));
    }
  };

  const openProfileSection = () => {
    navigate("/dashboard/user-profile");
  };

  return (
    <div className="main_dashboard_container">
      <div className="dashboard_navbar">
        <div className="navbar__logo" >
          <p onClick={() => navigate("/")}>LinkLite</p>
          <div className="bubble-left">Experience it now!</div>
        </div>
        <UserProfile />
      </div>


      <div className="table-title-container">
        <h2 className="table-title">
          Generated Links
        </h2>
        <GenerateLink updateNewUrl={addingNewUrl} />
      </div>

      {isLoading && <Spinner />}

      {!isLoading && <div className="table-wrapper">
        {urls.length != 0 && <table className="responsive-table">
          <thead>
            <tr>
              <th className="url_title_column">Title</th>
              <th className="dashboard_redirectURL_container">Redirect URL</th>
              <th className="short_url_class"><p>Short URL</p></th>
              <th className="visited_column">Hits</th>
              <th className="actions_button"></th>
            </tr>
          </thead>
          <tbody>
            {urls.map((val, index) => (
              <tr key={index}>
                <td data-label="Title" className="url_title_column">{val.title}</td>
                <td data-label="Redirect URL" className="dashboard_redirectURL_container">{val.redirectURL}</td>
                <td data-label="Short URL" className="short_url_class">{val.shortId}</td>
                <td data-label="Visited" className="visited_column">{val.vistedHistory.length}</td>

                <td data-label="Actions" className="actions_button">
                  <div className="actions_conatiner">
                    <ChangeActiveStatusOfURL changeStatus={ChangeStatusOfURL} value={val} />
                    <button className="info_button" onClick={() => navigateToViewDetailsPage(val._id)}>info</button>
                    <DeleteCreatedURL deleteShortUrl={deleteTheCreatedShortURL} value={val} />
                  </div>
                </td>
              </tr>
            )).reverse()}
          </tbody>
        </table>}
        {urls.length == 0 && <p className="no_activity_message">NO URL CREATED</p>}
      </div>}

      <div className="dashboard_page_footer">
        <p>© 2024 LINKLITE. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;
