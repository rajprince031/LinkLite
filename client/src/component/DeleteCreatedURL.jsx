import { useState } from "react"
import '../style/DeleteCreatedURL.css'
import '../style/CommonDialogBox.css'
import { toast } from "react-toastify";
import axios from "axios";

function DeleteCreatedURL({value, deleteShortUrl}) {
    const [isOpen, setIsOpen] = useState(false)
    const authToken = localStorage.getItem('authToken');
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const {_id, title} = value;

    const DeleteSelectedURL= async()=>{
        axios.delete(`${LOCALHOST_API}/url/url-shortener/${_id}`,{
            headers:{
                Authorization: authToken
            }
        }).then((res)=> {
            return deleteShortUrl(true, _id, title);
    }).catch(()=>{
        
        return toast.error('Something Went wrong')
    }).finally(()=>setIsOpen(false))
    }


    return (
        <div className>
            <button onClick={() => setIsOpen(true)}>delete</button>
            {isOpen &&
                <div className='dialog_box_overlay'>
                    <div className='main_content_box'>
                        <p>You want to delete the {title}</p>
                        <button onClick={DeleteSelectedURL}>confirm</button>
                        <button onClick={() => setIsOpen(false)}>cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteCreatedURL;