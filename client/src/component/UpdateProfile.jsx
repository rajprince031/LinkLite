import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = ({fName,lName,eMail}) => {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const [isOpen, setIsOpen] = useState(false);
    const [user, updateUser] = useState()

    useEffect(()=>{
        updateUser({
            firstName:fName,
            lastName:lName,
            email:eMail
        })
    },[])
    const handleSaveProfile = () => {

        if(!user.firstName.trim() || !user.email.trim()) {

            if(!user.email.trim()) updateUser({...user,email:""})
            if(!user.firstName.trim()) updateUser({...user,firstName:""})
            return toast.error('required field are missing');
        }

        axios.patch(`${LOCALHOST_API}/user/user-profile/update-profile`,user,{
            headers:{
                "Content-Type":"application/json",
                authorization : localStorage.getItem('authToken')
            },
        })
        .then((res)=>{
            setIsOpen(false)
            updateUser(res.data.user)
            console.log(res.data.user)
            return toast.success(res.data.msg)
        })
        .catch(err=>toast.error('Something Went Wrong !!'))

    }

    const handleCloseDialogBox = () => {
        setIsOpen(false);
        updateUser({
            firstName:fName,
            lastName:lName,
            email:eMail
        })
    }

    return (
        <div  >
            <button onClick={() => setIsOpen(true)}>Edit Profile</button>
            {isOpen &&
                <div className="dialog_box_overlay">
                    <div className="main_content_box">
                        <label>First Name</label>
                        <input
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={e => updateUser({ ...user, firstName: e.target.value })}
                        ></input>
                        <label>Last Name</label>
                        <input
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={e => updateUser({ ...user, lastName: e.target.value })}
                        ></input>
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            value={user.email}
                            onChange={e => updateUser({ ...user, email: e.target.value })}
                        ></input>
                        <div className="button_container">
                            <button onClick={handleSaveProfile}>Save Profile</button>
                            <button onClick={handleCloseDialogBox}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UpdateProfile;