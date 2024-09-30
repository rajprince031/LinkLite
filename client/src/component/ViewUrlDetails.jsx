import { useState } from "react";
import '../style/ViewUrlDetails.css'
const ViewUrlDetails = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        ip,
        browser,
        version,
        os,
        platform,
        source,
        isMobile,
        isTablet,
        isDesktop,
        isBot,
        browserVersion,
    } = props.userDetails;
    return (
        <div className="main_dialog_box_conatiner">
            <button onClick={() => setIsOpen(true)}>Info</button>

            {
                isOpen &&
                <div className='dialog_box_overlay'>
                    <div className="main_content_box">
                        <p><span className="text">IP Address :</span> {ip}</p>
                        <p><span className="text">Browser :</span> {browser}</p>
                        <p><span className="text">Version :</span> {version}</p>
                        <p><span className="text">OS :</span> {os}</p>
                        <p><span className="text">Platform :</span> {platform}</p>
                        <p><span className="text">Source :</span> {source}</p>
                        <p><span className="text">Browser Version :</span> {browserVersion}</p>
                        <p><span className="text">isMobile :</span> {isMobile.toString()}</p>
                        <p><span className="text">isTablet :</span> {isTablet.toString()}</p>
                        <p><span className="text">isDesktop :</span> {isDesktop.toString()}</p>
                        <p><span className="text">isBot :</span> {isBot.toString()}</p>

                        <div className="button_container">
                            <button onClick={() => setIsOpen(false)}>close</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default ViewUrlDetails;