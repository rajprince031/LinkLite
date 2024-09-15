import '../style/dashboardStyle.css';
import {useEffect, useState} from 'react'
import {useLocation, useNavigate } from 'react-router-dom'; 

const Dashboard = ()=>{
    const navigate = useNavigate();    
    const sessionId = localStorage.getItem('uid');
    const [urls,updateUrls] = useState([]);
    
    const [userURL,updateUserURL] = useState({
        sessionId,
        redirectURL:"",
    });

    const getAllUrl = async ()=>{
       fetch("http://localhost:8000/url/url-shortener",{
            method:"GET",
            headers:{
                Authorization : localStorage.getItem("uid")
            },
        })
        .then(res => res.json())
        .then(res => updateUrls(res))
        .catch(err=> console.log("Error in dashboard page : - " ,err))
    }

    useEffect(()=>{
        getAllUrl()
    },[])

    

    const handleGenerateURL = async()=>{
        try{
        const response = await fetch("http://localhost:8000/url/url-shortener",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                authorization : localStorage.getItem("uid")

            },
            body:JSON.stringify(userURL)
        })
        const {status} = response;
        if(status === 201){
            alert("short url generated successfully");
            updateUserURL({...userURL,redirectURL:"",})
            getAllUrl();
        }else if(status === 400){
            alert("Required field are missing")
        }else{
            alert("Something went wrong")
        }

    }catch(error){
        console.log("Error in dashboard while creating the short url : -",error);
    }
    }

    const navigateToViewDetailsPage =(details)=>{
        console.log("Printing the response : -", details)
        navigate(`/dashboard/view-details?short-id=${details.shortId}` , {state : {details}});
    }


    return (
        <div className="main_dashboard_conatiner">
            <h1>Hello I am Dashboard</h1>
            <div className='generate_url_box'>
                <label>Create short URL</label>
                <input 
                placeholder="Enter your url"
                value={userURL.url}
                onChange={e=>updateUserURL({...userURL,redirectURL:e.target.value})}
                ></input>
                <button onClick={handleGenerateURL}>Generate URL</button>
            </div>
            <div className="list_of_all_created_url">
                <h2>Created url</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Original-URL</th>
                        <th>Short-URL</th>
                        <th>No. of clicks</th>
                        <th>View Details</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        urls.map((val)=>{
                            return(
                                <tr>
                                <td>{val.redirectURL}</td>
                                <td>{val.shortId}</td>
                                <td>{val.vistedHistory.length}</td>
                                <td><button onClick={()=>navigateToViewDetailsPage(val)}>view</button></td>
                                <td>{val.status}</td>
                                <td><button>delete</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;