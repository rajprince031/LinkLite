import axios from "axios";
import "../style/SendMessage.css";
import { useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

export default function SendMessage({ closeMessage }) {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const [isSpinner, setIsSpinner] = useState(false)
    const [message, updateMessage] = useState({
        email: "",
        name: "",
        message: "",
    });

    const handleSendMessageRequest = () => {
        console.log(message);
        setIsSpinner(true)

        axios.post(`${LOCALHOST_API}/feedback/sendMessage`, message, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                toast.success("Message send Successfully");
                updateMessage({
                    email: "",
                    name: "",
                    message: "",
                })
                setIsSpinner(false)
                closeMessage();
            }).catch(err => {
                // console.log("printing err : ", err);
                toast.error(err.response.data.error)
                setIsSpinner(false)
            })

    }
    return (
        <div className="message-box">
            <input
                className="input"
                name="name"
                placeholder="Enter Your Name"
                type="name"
                value={message.name}
                onChange={(e) => updateMessage({ ...message, name: e.target.value })}
            />
            <input
                className="input"
                name="email"
                placeholder="Email Address"
                type="email"
                value={message.email}
                onChange={(e) => updateMessage({ ...message, email: e.target.value })}
            />
            <textarea
                className="input"
                name="message"
                placeholder="Enter your message ..."
                type="text"
                value={message.message}
                onChange={(e) => updateMessage({ ...message, message: e.target.value })}
            />
            <button className="send-message-button" onClick={handleSendMessageRequest}>
                {isSpinner && <span><Spinner /></span>}
                {!isSpinner && <span>Send Message</span>}
                </button>
            <button className="close-button" onClick={closeMessage}>Close Message</button>
        </div>
    );
}