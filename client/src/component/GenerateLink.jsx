import React, { useState } from "react";
import "../style/GenerateUrl.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function GenerateLink({updateNewUrl}) {

    const [isOpen, setIsOpen] = useState(false);
    const authToken = localStorage.getItem("authToken");
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;

    const apiURL = LOCALHOST_API;


    const [userURL, updateUserURL] = useState({
        title: "",
        authToken,
        redirectURL: "",
        activeStatus: true,
    });

    const handleCloseDialogBox = () => {
        setIsOpen(false);
        updateUserURL({
            title: "",
            authToken,
            redirectURL: "",
            activeStatus: true,
        })
    }
    const handleGenerateURL = async () => {
        axios.post(`${apiURL}/url/url-shortener`, userURL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken
            },
        })
            .then((res) => {
                updateNewUrl(res.data.newURL);
                handleCloseDialogBox();
                toast.success('Link created successfully.')
            }).catch((err)=>{
                toast.error(err.response.data.error)
            });
    };
    return (
        <div className="generate_url_container">
            <button onClick={() => setIsOpen(true)} >
                + Create Link
            </button>
            {isOpen &&
                <div onClick={handleCloseDialogBox} className="dialog_box_overlay">
                    <div
                        className="dialog_box_main_container"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="generate_input_field" >
                            <div className="gen_title">Generate your link</div>
                            <input
                                className="input"
                                placeholder="Enter title"
                                value={userURL.title}
                                onChange={e => updateUserURL({ ...userURL, title: e.target.value })}
                            ></input>
                            <input
                                className="input"
                                placeholder="Enter your url"
                                value={userURL.redirectURL}
                                onChange={(e) =>
                                    updateUserURL({ ...userURL, redirectURL: e.target.value })
                                }
                            ></input>
                        </div>
                        <div className='dashboard_gen_button'>
                            <button onClick={handleGenerateURL}><span>Generate URL</span></button>
                        </div>
                    </div>
                </div>

            }

        </div>
    );
}
