import { useState } from "react";
import { toast } from "react-toastify";
import '../style/CommonDialogBox.css'
import '../style/changeActiveStatus.css'
import axios from "axios";


function ChangeActiveStatusOfURL({ changeStatus, value }) {
    const authToken = localStorage.getItem('authToken')
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const [isOpen, setIsOpen] = useState(false);
    const { _id, title, activeStatus } = value;
    const [isActive, setIsActive] = useState(activeStatus);
    const onChangeStatusBtn = () => {
        axios.patch(`${LOCALHOST_API}/url/url-shortener/${_id}`, { activeStatus: !activeStatus }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
            },
        }).then((res) => {
            setIsOpen(false);
            setIsActive(res.data.activeStatus)
            console.log(res.data.activeStatus)
            return changeStatus(true, _id, res.data.activeStatus, title);
        }).catch(error => toast.error('Something went wrong!'))
    }


    return (
        <div>
            <div className="checkbox-wrapper-35">
                <input
                    onClick={onChangeStatusBtn}
                    value="private"
                    name={`switch-${_id}`} // Make the name unique
                    id={`switch-${_id}`} // Make the id unique
                    type="checkbox"
                    className="switch"
                    checked={!isActive} // Control the checkbox state
                    onChange={() => { }} // Prevent default checkbox behavior
                />
                <label htmlFor={`switch-${_id}`}>
                    <span className="switch-x-text"></span>
                </label>
            </div>
        </div>
    );




}


export default ChangeActiveStatusOfURL;