import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, React } from "react";
import moment from 'moment-timezone';


function formatTime(DateString) {
    const date = moment.utc(DateString)
    return date.tz('Asia/Kolkata').format('DD/MM/YYY - HH:mm:ss');
}

const ViewDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { details } = location.state;
    const { vistedHistory, redirectURL } = details;
    console.log("Printing the visted history :- ", vistedHistory);
    const url = new URLSearchParams(location.search);
    const shortId = url.get("short-id");
    useEffect(() => {
        if (!shortId) window.location.href = "/dashboard";
    }, []);
    return (
        <div className="main_view_details_conatiner">
            <h5>
                {
                    <div>
                        Short url - <a href={`http://localhost:8000/${shortId}`}>{shortId}</a>
                        <br/><br/>
                        Original URL - <a href={`${redirectURL}`}>{redirectURL}</a>
                    </div>
                }
            </h5>
            <h2>Visted History</h2>
            <div className="list_of_all_created_url">
                <table >
                    <thead>
                        <tr>
                            <th>Date - Time</th>
                            <th>Hostname</th>
                            <th>Method</th>
                            <th>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vistedHistory.map((val) => {

                                return (<tr>
                                    <td>{formatTime(val.dateTime)}</td>
                                    <td>{val.hostname}</td>
                                    <td>{val.method}</td>
                                    <td>{val.ip}</td>
                                </tr>);
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewDetails;
