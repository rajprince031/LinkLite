import "../style/dashboardStyle.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const apiURL = LOCALHOST_API;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [urls, updateUrls] = useState([]);

  const [userURL, updateUserURL] = useState({
    title:"",
    authToken,
    redirectURL: "",
    activeStatus: true,
  });

  const getAllUrl = async () => {
    fetch(`${apiURL}/url/url-shortener`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => updateUrls(res))
      .catch((err) =>{ 
        alert('Something went wrong')
        // console.log("Error in dashboard page : - ", err)
      });
  };

  useEffect(() => {
    getAllUrl();
  }, []);

  //handle the generate url
  const handleGenerateURL = async () => {
    try {
      const response = await fetch(`${apiURL}/url/url-shortener`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify(userURL),
      });
      const { status } = response;
      if (status === 201) {
        alert("short url generated successfully");
        getAllUrl();
        updateUserURL({ ...userURL, redirectURL:"", title:"" });
      } else if (status === 400) {
        alert("Required field are missing");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert('Something went wrong')
      // console.log("Error in dashboard while creating the short url : -", error);
    }
  };

  const navigateToViewDetailsPage = (urlId) => {
    navigate(`/dashboard/view-details`, { state: { urlId } });
  };

  //change active status
  const changeTheStatusOfCreatedURL = async(_id, activeStatus) => {
    try {
        const data = {
            activeStatus,
          }
      const response = await fetch(
        `${LOCALHOST_API}/url/url-shortener/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify(data),
        }
    );
        const {status} = response;
        if(status === 200) {
          getAllUrl()
          activeStatus ? alert('ShortURL is active') :  alert('ShortURL is Inactive');
        }
        else alert('Sonmething went wrong')
    } catch (error) {
      alert('Sonmething went wrong')
        // console.log("error while changing the status of the url : - ",error)
    }
  };

  //deletion function
  const deleteTheCreatedShortURL = async (id) => {
    if(confirm('Are you sure ?')){
      fetch(`${LOCALHOST_API}/url/url-shortener/${id}`,{
        method : "DELETE",
        headers : {
          Authorization : authToken
        }
      })
      .then(res => {
        if(res.status === 200)return res.json();
        return null;
      })
      .then(res => {
        const {deletedURL} = res;
        if(!deletedURL) return alert('Something went wrong!!!')
          const {title,shortId,redirectURL} = deletedURL;
        alert(`URL is deleted\nTitle : - ${title}\nshortID : - ${shortId}\nOriginal URL :- ${redirectURL}`)
        getAllUrl();
      })
      .catch(err => {
        alert('something went wrong!!!')
        // console.log("Error while deleting the shortURL\n",err)
      })
      
    }
  };

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
         onChange={e=>updateUserURL({...userURL,title:e.target.value})}
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
                    <button
                      onClick={() =>
                        changeTheStatusOfCreatedURL(val._id, !val.activeStatus)
                      }
                      style={
                        (val.activeStatus && { backgroundColor: "green" }) ||
                        (!val.activeStatus && { backgroundColor: "red" })
                      }
                    >
                      {val.activeStatus ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteTheCreatedShortURL(val._id)}>
                      Delete
                    </button>
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
