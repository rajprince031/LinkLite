import React, { useState } from "react";
import "../style/ContactPage.css";
import ContactMe from "./ContactMe";
import SendMessage from "./SendMessage";

const ContactPage = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us!");
        setForm({ name: "", email: "", message: "" });
    };
    return (
        <div className="contact-container">
            <div className="contact-heading">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-description">
                    Have questions, feedback, or feature requests? We'd love to hear from you!
                </p>
            </div>
            <div className="contact-details">
                {submitted ?
                    
                    <ContactMe openMessage={() => setSubmitted(false)} />
                    :
                    <SendMessage closeMessage={() => setSubmitted(true)} />}
            </div>
        </div>
    )
}
export default ContactPage;