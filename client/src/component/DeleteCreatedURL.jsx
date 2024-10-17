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
        <div className>
            {/* <button onClick={() => setIsOpen(true)}>delete</button> */}

            <button class="delete-button" onClick={() => setIsOpen(true)}>
                <svg class="delete-svgIcon" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
            </button>
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