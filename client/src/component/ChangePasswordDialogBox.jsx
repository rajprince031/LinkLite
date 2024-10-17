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
            <button onClick={()=>setIsOpen(true)} className="lock-button"> 
                
            <svg class="lock-svgIcon" viewBox="-0.5 -0.5 16 16">
    <path
      d="M7.5 8.235c-0.1949375 0 -0.38187499999999996 0.0775 -0.5196875 0.2153125s-0.2153125 0.32475 -0.2153125 0.5196875v2.205c0 0.1949375 0.0775 0.38187499999999996 0.2153125 0.51975s0.32475 0.21525 0.5196875 0.21525c0.1949375 0 0.3819375 -0.07743749999999999 0.51975 -0.21525s0.21525 -0.32481250000000006 0.21525 -0.51975v-2.205c0 -0.1949375 -0.07743749999999999 -0.38187499999999996 -0.21525 -0.5196875s-0.32481250000000006 -0.2153125 -0.51975 -0.2153125Zm3.675 -2.94V3.825c0 -0.9746875 -0.3871875 -1.9094375 -1.076375 -2.598625S8.4746875 0.15 7.5 0.15c-0.9746875 0 -1.9094375 0.3871875 -2.598625 1.076375S3.825 2.8503125000000002 3.825 3.825v1.47c-0.5848125 0 -1.145625 0.23231249999999998 -1.5591875 0.6458125000000001C1.8523124999999998 6.354375 1.62 6.9152499999999995 1.62 7.5v5.145c0 0.58475 0.23231249999999998 1.145625 0.6458125000000001 1.5591875 0.41356249999999994 0.4135 0.974375 0.6458125000000001 1.5591875 0.6458125000000001h7.35c0.58475 0 1.145625 -0.23231249999999998 1.5591875 -0.6458125000000001 0.4135 -0.41356249999999994 0.6458125000000001 -0.9744375 0.6458125000000001 -1.5591875V7.5c0 -0.58475 -0.23231249999999998 -1.145625 -0.6458125000000001 -1.5591875 -0.41356249999999994 -0.4135 -0.9744375 -0.6458125000000001 -1.5591875 -0.6458125000000001ZM5.295 3.825c0 -0.5848125 0.23231249999999998 -1.145625 0.6458125000000001 -1.5591875C6.354375 1.8523124999999998 6.9152499999999995 1.62 7.5 1.62s1.145625 0.23231249999999998 1.5591875 0.6458125000000001c0.4135 0.41356249999999994 0.6458125000000001 0.974375 0.6458125000000001 1.5591875v1.47H5.295V3.825Zm6.615 8.82c0 0.1949375 -0.07743749999999999 0.3819375 -0.21525 0.51975s-0.32481250000000006 0.21525 -0.51975 0.21525H3.825c-0.1949375 0 -0.38187499999999996 -0.07743749999999999 -0.51975 -0.21525 -0.1378125 -0.1378125 -0.21525 -0.32481250000000006 -0.21525 -0.51975V7.5c0 -0.1949375 0.07743749999999999 -0.38187499999999996 0.21525 -0.5196875 0.137875 -0.1378125 0.32481250000000006 -0.2153125 0.51975 -0.2153125h7.35c0.1949375 0 0.3819375 0.0775 0.51975 0.2153125s0.21525 0.32475 0.21525 0.5196875v5.145Z"
      fill="#ffffff"
      stroke-width="1"
    ></path>
  </svg>
            </button>

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