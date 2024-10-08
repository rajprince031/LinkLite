import axios from "axios";
import "../style/dashboardStyle.css";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import DeleteCreatedURL from "./DeleteCreatedURL";
import ChangeActiveStatusOfURL from "./ChangeActiveStatusOfURL";
import { useSelector } from "react-redux";


const Dashboard = () => {

  const details = useSelector(state=>state);
  console.log('Details time :- ', details)
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const apiURL = LOCALHOST_API;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [urls, updateUrls] = useState([]);

  const [userURL, updateUserURL] = useState({
    title: "",
    authToken,
    redirectURL: "",
    activeStatus: true,
  });

  //UseEffect
  useEffect(() => {
    axios.get(`${LOCALHOST_API}/url/url-shortener`, {
      headers: {
        Authorization: authToken
      }
    })
      .then((res) => updateUrls(res.data))
      .catch(error => toast.error('Something went wrong'))
  }, []);


  //Generate new url
  const handleGenerateURL = async () => {
    axios.post(`${apiURL}/url/url-shortener`, userURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken
      },
    })
      .then((res) => {
        updateUserURL({
          title: "",
          authToken,
          redirectURL: "",
          activeStatus: true,
        })
        return updateUrls([...urls, res.data.newURL])
      })

  };


  //url details page
  const navigateToViewDetailsPage = (urlId) => {
    navigate(`/dashboard/view-details`, { state: { urlId } });
  };

  //change active status
  const ChangeStatusOfURL=(isActive, _id , activeStatus, title)=>{
    if(isActive){
      updateUrls(urls.map(val=>{
        if(val._id == _id) val.activeStatus = activeStatus;
        return val;
      }))
      return toast.success(`${title} is ${activeStatus ? 'Actived' : 'Deactived'}`)
    }
  }

  //deletion function
  const deleteTheCreatedShortURL = (isDelete, id, title)=>{
    if(isDelete){
      toast.success(`${title} Deleted Successfully`)
      return updateUrls(urls.filter(val => val._id!=id));
    }
  }

  //profile vist
  const vistToProfile = () => {
    navigate("/dashboard/user-profile");
  };


  return (
    <div className="main_dashboard_conatiner">
      <div className="navbar">
        <h2 onClick={vistToProfile}>Profile</h2>
      </div>
      <h1>Hello I am Dashboard</h1>
      <div className="generate_url_box">
        <label>Create short URL</label>
        <input
          placeholder="Enter title"
          value={userURL.title}
          onChange={e => updateUserURL({ ...userURL, title: e.target.value })}
        ></input>
        <input
          placeholder="Enter your url"
          value={userURL.redirectURL}
          onChange={(e) =>
            updateUserURL({ ...userURL, redirectURL: e.target.value })
          }
        ></input>
        <button onClick={handleGenerateURL}>Generate URL</button>
      </div>
      <h2>Created url</h2>
      <div className="list_of_all_created_url">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Original-URL</th>
              <th>Short-URL</th>
              <th>No. of clicks</th>
              <th>View Details</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((val) => {
              return (
                <tr>
                  <td>{val.title}</td>
                  <td className="redirectURL_container">{val.redirectURL}</td>
                  <td>{val.shortId}</td>
                  <td>{val.vistedHistory.length}</td>
                  <td>
                    <button onClick={() => navigateToViewDetailsPage(val._id)}>
                      view
                    </button>
                  </td>
                  <td>
                   <ChangeActiveStatusOfURL changeStatus={ChangeStatusOfURL} value={val}/>
                  </td>
                  <td>
                    <DeleteCreatedURL deleteShortUrl={deleteTheCreatedShortURL} value={val}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
