import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect, React, useState } from "react";
import moment from "moment-timezone";
import { LOCALHOST_API } from "../utils/constant";

function formatTime(DateString) {
  const date = moment.utc(DateString);
  return date.tz("Asia/Kolkata").format("DD/MM/YYYY - HH:mm:ss");
}

const ViewDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [urlId, setUrlId] = useState(location.state?.urlId);
  if (!urlId) navigate("/dashboard");
  const [details, setDetails] = useState({
    shortId: "",
    redirectURL: "",
    vistedHistory: [],
  });
  const getAllDeatils = () => {
    fetch(`${LOCALHOST_API}/url/url-shortener/${urlId}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => setDetails(res.urlDetails))
      .catch((err) => {
        alert('Something went wrong')
        // console.log("error occur :- ", err)
  });
  };
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
      <h2>Visted History</h2>
      <div className="list_of_all_created_url">
        <table>
          <thead>
            <tr>
              <th>Date - Time</th>
              <th>Hostname</th>
              <th>Method</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {details.vistedHistory.map((val) => {
              return (
                <tr>
                  <td>{formatTime(val.dateTime)}</td>
                  <td>{val.hostname}</td>
                  <td>{val.method}</td>
                  <td>{val.ip}</td>
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
