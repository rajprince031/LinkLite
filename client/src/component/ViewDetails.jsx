import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect, React, useState } from "react";
import moment from "moment-timezone";
import '../style/viewDetailsStyle.css'
import axios from "axios";
import { toast } from "react-toastify";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import DeleteCreatedURL from "./DeleteCreatedURL";
import ViewIPAddressDetails from "./ViewIPAddressDetails";

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
      return updatefilterIP(arr);
    }
      , 1000)

    return () => clearTimeout(debounce)
  }, [ipAddress])

  useEffect(() => {
    getAllDeatils();
  }
    , []);

  const openProfileSection = () => {
    navigate("/dashboard/user-profile");

  }

  return (
    <div className="main_view_details_container">
      <div className="dashboard_navbar">
        <div className="navbar__logo" >
          <p onClick={() => navigate("/")}>LinkLite</p>
          <div className="bubble-left">Experience it now!</div>
        </div>
        <UserProfile />
      </div>

      <div className='view_details_url_info'>
        Title - {details.title}
        <br />
        Short url - {" "}
        <a href={`${LOCALHOST_API}/${details.shortId}`} target="_blank">
          {`${LOCALHOST_API}/${details.shortId}`}
        </a>
        <br />
        Source URL - {" "}
        <a href={`${details.redirectURL}`} target="_blank">{details.redirectURL}</a>
      </div>


      <div className="table-title-container">
        <h2 className="table-title">
          User Access Records
        </h2>

        <div className="vd_search_box_container">
          <div class="vd_input_container">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
              <g>
                <path
                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                ></path>
              </g>
            </svg>
            <input
              id="query"
              class="input"
              type="search"
              name="searchbar"
              value={ipAddress}
              onChange={e => updateIpAddress(e.target.value)}
              placeholder="Search IP Address"
            />
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        {filterIp.length != 0 && <table className="responsive-table">
          <thead>
            <tr>
              <th className="vd_ip_column">IP Address</th>
              <th className="vd_platform_column">Platform</th>
              <th className="vd_browser_column"><p>Browser</p></th>
              <th className="vd_time_column">Time</th>
              <th className="vd_date_column">Date</th>
              <th className="vd_info_column"></th>
            </tr>
          </thead>
          <tbody>
            {filterIp.map((val, index) => {
              const {
                dateTime,
                ip,
                browser,
                platform,
              } = val
              const [Date, Time] = formatTime(dateTime).split(" - ")

              return (<tr key={index}>
                <td className="vd_ip_column">{ip}</td>
                <td className="vd_platform_column">{platform}</td>
                <td className="vd_browser_column">{browser}</td>
                <td className="vd_date_column">{Time}</td>
                <td className="vd_info_column">{Date}</td>

                <td data-label="Actions" className="actions_button">
                  <div className="actions_conatiner">
                    <ViewIPAddressDetails userDetails={val} />
                  </div>
                </td>
              </tr>)
            }
            ).reverse()}
          </tbody>
        </table>}
        {filterIp.length == 0 && <p className="no_activity_message">No Activity Detected</p>}
      </div>

      <div className="dashboard_page_footer">
        <p>© 2024 LINKLITE. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ViewDetails;
