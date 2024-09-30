import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect, React, useState } from "react";
import moment from "moment-timezone";
import '../style/viewDetailsStyle.css'
import ViewUrlDetails from "./ViewUrlDetails";

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
  const [showAllUser,setShowAllUser] = useState(false);
  if (!urlId) navigate("/dashboard");


  const [details, setDetails] = useState({
    shortId: "",
    redirectURL: "",
    vistedHistory: [],
  });

  const [filterIp,updatefilterIP] = useState([])
  const getAllDeatils = () => {
    fetch(`${LOCALHOST_API}/url/url-shortener/${urlId}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDetails(res.urlDetails)
        updatefilterIP(res.urlDetails.vistedHistory)
        console.log(details.vistedHistory)
      })
      .catch((err) => {
        alert('Something went wrong')
        // console.log("error occur :- ", err)
      });
  };


  const filterUser =()=>{
    updateIpAddress("")
    if(!ipAddress || ipAddress.trim() === ""){
       return alert('search box empty')
    }
    const arr = details.vistedHistory.filter((val)=>val.ip == ipAddress.trim())
    if(arr.length===0) {
      return alert(`${ipAddress.trim()} not found`)
    }
    return updatefilterIP(arr);
  }

  useEffect(() => {
    getAllDeatils();
  }, []);


  return (
    <div className="main_view_details_conatiner">
      <h2>Details</h2>
      <h5>
        {
          <div>
            Title - {details.title}
            <br />
            <br />
            Short url -
            <a href={`${LOCALHOST_API}/${details.shortId}`}>
              {details.shortId}
            </a>
            <br />
            <br />
            Original URL - {" "}
            <a href={`${details.redirectURL}`}>{details.redirectURL}</a>
          </div>
        }
      </h5>
      <div className="details_history_bar">
        Visted History
        <div className="search_box">
          <input
            placeholder="search ip"
            value={ipAddress}
            onChange={e => updateIpAddress(e.target.value )}
          ></input>
          <button onClick={filterUser}>search</button>
        </div>
      </div>
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

                const [Date,Time] = formatTime(dateTime).split(" - ")
              return (
                <tr>
                  <td>{ip}</td>
                  <td>{platform}</td>
                  <td>{browser}</td>
                  <td>{Date}</td>
                  <td>{Time}</td>
                  <td><ViewUrlDetails userDetails = {val}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDetails;
