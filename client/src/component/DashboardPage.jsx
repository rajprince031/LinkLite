import axios from "axios";
import "../style/dashboardStyle.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteCreatedURL from "./DeleteCreatedURL";
import ChangeActiveStatusOfURL from "./ChangeActiveStatusOfURL";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";


const Dashboard = () => {

  const details = useSelector(state => state.userProfile);
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const apiURL = LOCALHOST_API;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
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

  //UseEffect
  useEffect(() => {
    axios.get(`${LOCALHOST_API}/url/url-shortener`, {
      headers: {
        Authorization: authToken
      }
    })
      .then((res) => {
        updateUrls(res.data)
        return
      })
      .catch(error => toast.error('Something went wrong'))
  }, []);


  useEffect(() => {
    let sum = 0;
    urls.forEach(val => { sum = sum + val.vistedHistory.length })
    setTotal({ ...total, totalURL: urls.length, totalClicks: sum })
  }, [urls])

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
        updateUrls([...urls, res.data.newURL])

        return
      })

  };


  //url details page
  const navigateToViewDetailsPage = (urlId) => {
    navigate(`/dashboard/view-details`, { state: { urlId } });
  };

  //change active status
  const ChangeStatusOfURL = (isActive, _id, activeStatus, title) => {
    if (isActive) {
      updateUrls(urls.map(val => {
        if (val._id == _id) val.activeStatus = activeStatus;
        return val;
      }))
      return toast.success(`${title} is ${activeStatus ? 'Actived' : 'Deactived'}`)
    }
  }

  //deletion function
  const deleteTheCreatedShortURL = (isDelete, id, title) => {
    if (isDelete) {
      toast.success(`${title} Deleted Successfully`)
      return updateUrls(urls.filter(val => val._id != id));
    }
  }

  //profile vist
  const openProfileSection = () => {
    navigate("/dashboard/user-profile");
  };



  return (
    <div className="main_dashboard_container">
      <div className="navbar_container">
        <div className='title_name'>
          <p onClick={() => navigate('/')}>LinkLite</p>
          <div className='bubble-left'>
            Experience it now!
          </div>
        </div>
        <div className='navbar_options'>
          <button className='login_btn' onClick={openProfileSection}>{details.firstName}</button>
        </div>
      </div>
      <div className="dashboard_main_container">
        <div className="dashboard_profile_container">
          <UserProfile />
        </div>
        <div className="dashboard_container">
          <div className="dashboard_upper_container">
            <div className="dashboard_generate_url">
              <div className="dashboard_gen_input_field">
                <div className="dashboard_gen_title">Generate your link</div>
                <br></br>
                <input
                  className="input"
                  placeholder="Enter title"
                  value={userURL.title}
                  onChange={e => updateUserURL({ ...userURL, title: e.target.value })}
                ></input>
                <input
                  className="input"
                  placeholder="Enter your url"
                  value={userURL.redirectURL}
                  onChange={(e) =>
                    updateUserURL({ ...userURL, redirectURL: e.target.value })
                  }
                ></input>
              </div>
              <div className='dashboard_gen_button'>
                <button onClick={handleGenerateURL}><span>Generate URL</span></button>
              </div>
            </div>
            <div className="dashboard_pending">
              <p>Total Clicks - {total.totalClicks}</p>
              <p>Total Created URL - {total.totalURL}</p>
            </div>
          </div>
          <div className="dashboard_lower_container">
        
            <div className="dashboard_show_urls">
              <h2>Created url</h2>
              <div className="dashboard_list_of_all_created_url">

                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th className='dashboard_redirectURL_container'>Source URL</th>
                      <th className='short_url_class'>Shortened URL</th>
                      <th className='total_clicks'>Total Clicks</th>
                      <th className="view_more_class"></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((val) => {
                      return (
                        <tr>
                          <td>{val.title}</td>
                          <td className="dashboard_redirectURL_container">{val.redirectURL}</td>
                          <td className='short_url_class'>{val.shortId}</td>
                          <td>{val.vistedHistory.length}</td>
                          <td className="view_more_class">
                            <button onClick={() => navigateToViewDetailsPage(val._id)}>
                              view
                            </button>
                          </td>
                          <td className='status_and_delete_button'>
                            <ChangeActiveStatusOfURL changeStatus={ChangeStatusOfURL} value={val} />
                            <DeleteCreatedURL deleteShortUrl={deleteTheCreatedShortURL} value={val} />
                          </td>
                        </tr>
                      );
                    }).reverse()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='signature'>
        <p>© 2024 LINKLITE. All rights reserved.</p>
        <p>Created by <strong>Prince Raj</strong></p>
      </div>
    </div>
  )

};


export default Dashboard;
