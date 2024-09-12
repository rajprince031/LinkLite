import '../style/dashboardStyle.css';
import {useEffect, useState} from 'react'
import {useLocation, useNavigate } from 'react-router-dom'; 

const Dashboard = ()=>{
    const navigate = useNavigate();    
    const location = useLocation();
    const sessionId = location.state?.sessionId;
    
    const [userURL,updateUserURL] = useState({
        sessionId,
        redirectURL:"",
    });
    const [urls,updateUrls] = useState([]);
    const getAllUrl = async ()=>{
        try{
        const response = await fetch("http://localhost:8000/url/url-shortener",{
            method:"GET",
            headers:{
                authorization : localStorage.getItem("uid")
            },
        })
            const {status} = response;
            if(status === 200){
                const arr = await response.json();
                updateUrls(arr);
            }else{
                navigate('/login')
            }
        }catch(error){
            console.log("Error occur during fetching the urls : - ",error)
        }
    }

    useEffect(()=>{
        getAllUrl()
    },[])

    

    const handleGenerateURL = async()=>{
        try{
            console.log("I am here 1")
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
    console.log("I am here 2")


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
                    <tr>
                        <th>URL</th>
                        <th>Short-URL</th>
                        <th>NO. OF Clicks</th>
                    </tr>
                    {
                        urls.map((val)=>{
                            return(
                                <tr>
                                <td>{val.redirectURL}</td>
                                <td>{val.shortId}</td>
                                <td>{val.vistedHistory.length}</td>
                                </tr>
                            )
                        })
                    }
                    
                </table>
            </div>
        </div>
    )
}

export default Dashboard;