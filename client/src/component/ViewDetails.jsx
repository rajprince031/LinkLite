import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect, React, useState } from "react";
import moment from "moment-timezone";
import '../style/viewDetailsStyle.css'
import ViewUrlDetails from "./ViewUrlDetails";
import axios from "axios";
import { toast } from "react-toastify";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";

function formatTime(DateString) {
  const date = moment.utc(DateString);
  return date.tz("Asia/Kolkata").format("DD/MM/YYYY - HH:mm:ss");
}

const ViewDetails = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;

  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = useSelector(state => state.userProfile);
  const [urlId, setUrlId] = useState(location.state?.urlId);
  const [ipAddress, updateIpAddress] = useState();
  if (!urlId) navigate("/view_details");


  const [details, setDetails] = useState({
    shortId: "",
    redirectURL: "",
    vistedHistory: [],
  });

  const [filterIp, updatefilterIP] = useState([])
  const getAllDeatils = () => {
    axios(`${LOCALHOST_API}/url/url-shortener/${urlId}`, {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((res) => {
        const urlDetails = res.data.urlDetails
        setDetails(urlDetails)
        updatefilterIP(urlDetails.vistedHistory)
      })
      .catch((error) => {
        toast.error(error.response.data.error)
        console.log("error occur :- ", err)
      });
  };


  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!ipAddress || ipAddress.trim() === "") {
        getAllDeatils();
        return
      }
      const arr = details.vistedHistory.filter((val) => val.ip.toString().startsWith(ipAddress.trim()))
      if (arr.length === 0) {
        updateIpAddress("")
        return toast.error(`${ipAddress.trim()} not found`)
      }
      return updatefilterIP(arr);
    }
      , 1000)

      return ()=> clearTimeout(debounce)
  }, [ipAddress])

  useEffect(() => {
    getAllDeatils();
  }
    , []);

  const openProfileSection = () => {
    navigate("/dashboard/user-profile");

  }


  return (
    <div className="view_details_main_container">
      <div className="navbar_container">
        <div className='title_name'>
          <p onClick={() => navigate('/')}>LinkLite</p>
          <div className='bubble-left'>
            Experience it now!
          </div>
        </div>
        <div className='navbar_options'>
          <button className='login_btn' onClick={openProfileSection}>{userDetails.firstName}</button>
        </div>
      </div>
      <div className="view_details_inner_main_container">
        <div className="view_details_profile_container">
          <UserProfile />
        </div>
        <div className="view_details_container">
          <div className="view_details_upper_container">
            <div className="view_details_generate_url">
              <div className="view_details_gen_input_field">
                <div className="view_details_gen_title">URL Information Panel</div>
                <div className='view_details_url_info'>
                  Title - {details.title}
                  <br />
                  Short url -
                  <a href={`${LOCALHOST_API}/${details.shortId}`}>
                    {`${LOCALHOST_API}/${details.shortId}`}
                  </a>
                  <br />
                  Source URL - {" "}
                  <a href={`${details.redirectURL}`}>{details.redirectURL}</a>
                </div>
              </div>
            </div>
            <div className="search_box_container">
              <div class="view_details_input-container">
                <input
                  value={ipAddress}
                  onChange={e => updateIpAddress(e.target.value)}
                  placeholder="Search the IP Address"
                  type="text"
                  name="text"
                  class="view_details_input"
                />
              </div>
              {/* <div className="view_details_search_btn">
                <button className='fancy' onClick={filterUser}>
                  <span class="top-key"></span>
                  <span class="text">search</span>
                  <span class="bottom-key-1"></span>
                  <span class="bottom-key-2"></span>
                </button>
              </div> */}

            </div>
          </div>
          <div className="view_details_lower_container">
            <div className="view_details_show_urls">
              <h2>Device Access Log</h2>
              <div className="list_of_all_created_url">
                <table>
                  <thead>
                    <tr>
                      <th className="ipAddress">IP Address</th>
                      <th>Platfrom</th>
                      <th className="browser_name">Browser</th>
                      <th className="time">Time</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterIp.map((val) => {
                      const {
                        dateTime,
                        ip,
                        browser,
                        platform,
                      } = val

                      const [Date, Time] = formatTime(dateTime).split(" - ")
                      return (
                        <tr>
                          <td className="ipAddress">{ip}</td>
                          <td>{platform}</td>
                          <td className="browser_name">{browser}</td>
                          <td>{Date}</td>
                          <td className="time">{Time}</td>
                          <td><ViewUrlDetails userDetails={val} /></td>
                        </tr>
                      );
                    })}
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
}


export default ViewDetails;
