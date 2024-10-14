import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userDetails } from "../redux/slices/UserDetails";

const UpdateProfile = () => {
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const dispatch = useDispatch();
    const {firstName, lastName, email} = useSelector(state=>state.userProfile)
    const [isOpen, setIsOpen] = useState(false);
    let [user, updateUser] = useState({})


    useEffect(()=>{
        updateUser({
            firstName,
            lastName,
            email
        })
    },[])
    const handleSaveProfile = () => {

        if(!user.firstName.trim() || !user.email.trim()) {

            if(!user.email.trim()) updateUser({...user,email:""})
            if(!user.firstName.trim()) updateUser({...user,firstName:""})
            toast.error('required field are missing');
            return 
        }

        axios.patch(`${LOCALHOST_API}/user/user-profile/update-profile`,user,{
            headers:{
                "Content-Type":"application/json",
                authorization : localStorage.getItem('authToken')
            },
        })
        .then((res)=>{
            dispatch(userDetails(res.data.user))
            console.log("kjhadfkjhl ",res.data.user)
            setIsOpen(false)
            toast.success(res.data.msg)
            return 
        })
        .catch(err=>{
            console.log(err)
            toast.error('Something Went Wrong !!')
    })

    }

    const handleCloseDialogBox = () => {
        setIsOpen(false);
        updateUser({
            firstName,
            lastName,
            email
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