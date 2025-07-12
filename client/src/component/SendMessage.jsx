import "../style/SendMessage.css";

export default function SendMessage({closeMessage}) {

    return (
        <div className="message-box">
            <input className="input" name="name" placeholder="Enter Your Name" type="name"/>
            <input className="input" name="email" placeholder="Email Address" type="email"/>
            <textarea className="input" name="message" placeholder="Enter your message ..." type="text"/>
            <button className="send-message-button">Send Message</button>
            <button className="close-button" onClick={closeMessage}>Close Message</button>
        </div>
    );
}