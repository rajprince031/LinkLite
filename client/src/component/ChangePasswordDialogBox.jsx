import { useState } from "react";
import '../style/changePasswordDialogBox.css';
import '../style/CommonDialogBox.css';
import { toast } from "react-toastify";

const ChangePasswordDialogBox=()=>{
    const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
    const [isOpen,setIsOpen] = useState(false);
    const [pass, updatePassword]=useState({
        password:"",
        newPassword:"",
        confirmNewPassword:""
    });



    const handleSavePassword=()=>{

        if(pass.newPassword !== pass.confirmNewPassword){
            return toast.error('New Password and Confirm New Password are not matched');
        }
        const {password,newPassword} = pass;
        fetch(`${LOCALHOST_API}/user/user-profile/change-password`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                authorization : localStorage.getItem('authToken')
            },
            body:JSON.stringify({
                password,
                newPassword
            })
        })
        .then(async (res)=>{
            const {status} = res;
            if(status!=200){
                res = await res.json()
                 return alert(res.error)
            }
                setIsOpen(false);
                updatePassword({
                    password:"",
                    newPassword:"",
                    confirmNewPassword:""
                })
                return alert('Password updated successfully')

        })
    }


    const handleCloseDialogBox =()=>{
        setIsOpen(false);
                updatePassword({
                    password:"",
                    newPassword:"",
                    confirmNewPassword:""
                })
    }

    return(
        <div className="main_dialog_box_conatiner">
            <button onClick={()=>setIsOpen(true)}> Change Password </button>

            {
                isOpen &&
                <div className='dialog_box_overlay'>
                    <div className="main_content_box">
                        <p>Change Your Password</p>
                        <label>Enter your current password</label>
                        <input 
                        placeholder="Current Password"
                        value={pass.password}
                        onChange={e=>updatePassword({...pass,password:e.target.value})}
                        ></input>

                        <label>Enter your new password</label>
                        <input 
                        placeholder="New Password"
                        value={pass.newPassword}
                        onChange={e=>updatePassword({...pass,newPassword:e.target.value})}
                        ></input>

                        <label>Confirm your New Password</label>
                        <input 
                        placeholder="Confirm New Password"
                        value={pass.confirmNewPassword}
                        onChange={e=>updatePassword({...pass,confirmNewPassword:e.target.value})}
                        ></input>

                        <div className="button_container">
                            <button onClick={handleSavePassword}>save Password</button>
                            <button onClick={handleCloseDialogBox}>close</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default  ChangePasswordDialogBox;