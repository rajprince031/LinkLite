import { useState } from "react";
import '../style/CommonDialogBox.css';
import '../style/ViewIPAddressDetails.css';
const ViewIPAddressDetails = (props) => {
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
        <div className="ip_details_dialog_box_conatiner">
            <button onClick={() => setIsOpen(true)} className="info_button">Info</button>

            {
                isOpen &&
                <div onClick={() => setIsOpen(false)} className='ip_details_dialog_box_overlay'>
                    <div onClick={(e) => e.stopPropagation()} className="ip_details_main_content_box">
                        <ul className="ip_details_text_list">
                            <li><strong>IP Address:</strong> {ip}</li>
                            <li><strong>Browser:</strong> {browser}</li>
                            <li><strong>Version:</strong> {version}</li>
                            <li><strong>OS:</strong> {os}</li>
                            <li><strong>Platform:</strong> {platform}</li>
                            <li><strong>Source:</strong> {source}</li>
                            <li><strong>Browser Version:</strong> {browserVersion}</li>
                            <li><strong>isMobile:</strong> {isMobile.toString()}</li>
                            <li><strong>isTablet:</strong> {isTablet.toString()}</li>
                            <li><strong>isDesktop:</strong> {isDesktop.toString()}</li>
                            <li><strong>isBot:</strong> {isBot.toString()}</li>
                        </ul>

                        <button onClick={() => setIsOpen(false)}>close</button>
                    </div>

                </div>
            }
        </div>
    )
}


export default ViewIPAddressDetails;