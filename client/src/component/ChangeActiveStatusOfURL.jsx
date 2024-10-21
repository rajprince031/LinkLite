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
    return (<div>


        {/*  */}
        <div class="checkbox-wrapper-35">
            <input onClick={onChangeStatusBtn} value="private" name="switch" id="switch" type="checkbox" class="switch"/>
                <label for="switch">
                    <span class="switch-x-text"></span>
                </label>
        </div>

        {/*  */}


        {/* <button onClick={() => setIsOpen(true)}>{isActive ? 'active' : 'inactive'}</button> */}
        {/* {isOpen &&
            <div className="dialog_box_overlay">
                <div className="main_content_box">
                    <p>You want to {!isActive ? 'active' : 'inactive'} this {title}</p>
                    <button onClick={onChangeStatusBtn}>confirm</button>
                    <button onClick={() => setIsOpen(false)}>close</button>
                </div>
            </div>
        } */}


    </div>

    )
}


export default ChangeActiveStatusOfURL;