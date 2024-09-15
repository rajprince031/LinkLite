import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ViewDetails =()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search)
    const shortId = url.get('short-id')
    useEffect(()=>{
        if(!shortId) window.location.href = '/dashboard'
    },[])
    return <div>I am vewDetails page {JSON.stringify(shortId)}</div>
}

export default ViewDetails;