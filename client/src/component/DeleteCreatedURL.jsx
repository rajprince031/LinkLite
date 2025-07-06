import { useState } from "react"
import '../style/DeleteCreatedURL.css'
import '../style/CommonDialogBox.css'
import { toast } from "react-toastify";
import axios from "axios";

function DeleteCreatedURL({ value, deleteShortUrl }) {
    const [isOpen, setIsOpen] = useState(false)
    const authToken = localStorage.getItem('authToken');
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const { _id, title } = value;

    const DeleteSelectedURL = async () => {
        axios.delete(`${LOCALHOST_API}/url/url-shortener/${_id}`, {
            headers: {
                Authorization: authToken
            }
        }).then((res) => {
            return deleteShortUrl(true, _id, title);
        }).catch(() => {

            return toast.error('Something Went wrong')
        }).finally(() => setIsOpen(false))
    }


    return (
        <div className="delete_url_container">
            <button class="delete_button_btn" onClick={() => setIsOpen(true)}>
                <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                    <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                </svg>
            </button>
            {isOpen &&
                <div onClick={() => setIsOpen(false)} className='dialog_box_overlay'>
                    <div class="card" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <div class="header">
                            <div class="image"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                            </svg></div>
                            <div class="content">
                                <span class="delete_title">Delete URL</span>
                                <p class="message">You want to delete the {title}</p>
                            </div>
                            <div class="actions">
                                <button onClick={DeleteSelectedURL} class="desactivate" type="button">Delete</button>
                                <button onClick={() => setIsOpen(false)} class="cancel" type="button">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteCreatedURL;