import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect, React, useState } from "react";
import moment from "moment-timezone";
import '../style/viewDetailsStyle.css'
import ViewUrlDetails from "./ViewUrlDetails";
import axios from "axios";
import { toast } from "react-toastify";
import UserProfile from "./UserProfile";

function formatTime(DateString) {
  const date = moment.utc(DateString);
  return date.tz("Asia/Kolkata").format("DD/MM/YYYY - HH:mm:ss");
}

const ViewDetails = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;

  const navigate = useNavigate();
  const location = useLocation();
  const [urlId, setUrlId] = useState(location.state?.urlId);
  const [ipAddress, updateIpAddress] = useState();
  const [showAllUser, setShowAllUser] = useState(false);
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
        console.log("view details : ", details.vistedHistory)
      })
      .catch((error) => {
        toast.error(error.response.data.error)
        console.log("error occur :- ", err)
      });
  };


  const filterUser = () => {
    updateIpAddress("")
    if (!ipAddress || ipAddress.trim() === "") {
      return alert('search box empty')
    }
    const arr = details.vistedHistory.filter((val) => val.ip == ipAddress.trim())
    if (arr.length === 0) {
      return alert(`${ipAddress.trim()} not found`)
    }
    return updatefilterIP(arr);
  }

  useEffect(() => {
    getAllDeatils();
  }, []);




  return (
    <div className="view_details_main_container">
      <div className="navbar_container">
        <div className='title_name'>
          <p onClick={()=>navigate('/')}>LinkLite</p>
          <div className='bubble-left'>
            Experience it now!
          </div>
        </div>
        <div className='navbar_options'>
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
                    {details.shortId}
                  </a>
                  <br />
                  Source URL - {" "}
                  <a href={`${details.redirectURL}`}>{details.redirectURL}</a>
                </div>
              </div>
            </div>
            <div className="view_details_pending">
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
              <div className="view_details_search_btn">
              <button className='fancy' onClick={filterUser}>
                <span class="top-key"></span>
                <span class="text">search</span>
                <span class="bottom-key-1"></span>
                <span class="bottom-key-2"></span>
              </button>
              </div>

            </div>
          </div>
          <div className="view_details_lower_container">
            <div className="view_details_show_urls">
              <h2>Device Access Log</h2>
              <div className="list_of_all_created_url">
                <table>
                  <thead>
                    <tr>
                      <th>IP Address</th>
                      <th>Platfrom</th>
                      <th>Browser</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Full Details</th>
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
                          <td>{ip}</td>
                          <td>{platform}</td>
                          <td>{browser}</td>
                          <td>{Date}</td>
                          <td>{Time}</td>
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

// return (
//   <div className="main_view_details_conatiner">
//     <h2>Details</h2>
//     <h5>
//       {
//         <div>
//           Title - {details.title}
//           <br />
//           <br />
//           Short url -
//           <a href={`${LOCALHOST_API}/${details.shortId}`}>
//             {details.shortId}
//           </a>
//           <br />
//           <br />
//           Original URL - {" "}
//           <a href={`${details.redirectURL}`}>{details.redirectURL}</a>
//         </div>
//       }
//     </h5>
//     <div className="details_history_bar">
//       Visted History
//       <div className="search_box">
//         <input
//           placeholder="search ip"
//           value={ipAddress}
//           onChange={e => updateIpAddress(e.target.value)}
//         ></input>
//         <button onClick={filterUser}>search</button>
//       </div>
//     </div>
//     <div className="list_of_all_created_url">
//       <table>
//         <thead>
//           <tr>
//             <th>IP Address</th>
//             <th>Platfrom</th>
//             <th>Browser</th>
//             <th>Time</th>
//             <th>Date</th>
//             <th>Full Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filterIp.map((val) => {
//             const {
//               dateTime,
//               ip,
//               browser,
//               platform,
//             } = val

//             const [Date, Time] = formatTime(dateTime).split(" - ")
//             return (
//               <tr>
//                 <td>{ip}</td>
//                 <td>{platform}</td>
//                 <td>{browser}</td>
//                 <td>{Date}</td>
//                 <td>{Time}</td>
//                 <td><ViewUrlDetails userDetails={val} /></td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   </div>
//   );
// };

export default ViewDetails;
