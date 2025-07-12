import { useState } from "react";
import '../style/CommonDialogBox.css';
import '../style/changePasswordDialogBox.css';
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import axios from "axios";

const ChangePasswordDialogBox = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVaild, setIsPasswordVaild] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, updatePassword] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handleSavePassword = () => {
    setIsLoading(true);

    if (pass.newPassword !== pass.confirmNewPassword) {
      setIsLoading(false);
      return toast.error("New Password and Confirm Password do not match.");
    }

    const { password, newPassword } = pass;

    axios.patch(`${LOCALHOST_API}/user/user-profile/change-password`, {
      password,
      newPassword
    }, {
      headers: {
        authorization: localStorage.getItem("authToken")
      }
    }).then(() => {
      setIsLoading(false);
      setIsOpen(false);
      updatePassword({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      toast.success("Password updated successfully.");
    }).catch(() => {
      setIsLoading(false);
      setIsPasswordVaild(false);
      toast.error("Something went wrong! Try again");
    });
  };

  const handleCloseDialogBox = () => {
    setIsOpen(false);
    updatePassword({
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  return (
    <div className="main_dialog_box_conatiner">
      <p onClick={() => setIsOpen(true)} className="lock-button">
        Change Password
      </p>

      {isOpen && (
        <div className="dialog_box_overlay" onClick={handleCloseDialogBox}>
          <div className="main_content_box" onClick={e => e.stopPropagation()}>
            <p className="title">Change Your Password</p>

            <div className="input_container">
              <label className="input_label" htmlFor="current_pass">Current Password</label>
              <input
                id="current_pass"
                className="input input_field"
                placeholder="Current Password"
                type="password"
                value={pass.password}
                onChange={e => updatePassword({ ...pass, password: e.target.value })}
              />
            </div>

            <div className="input_container">
              <label className="input_label" htmlFor="new_pass">New Password</label>
              <input
                id="new_pass"
                className="input input_field"
                placeholder="New Password"
                type="password"
                value={pass.newPassword}
                onChange={e => updatePassword({ ...pass, newPassword: e.target.value })}
              />
            </div>

            <div className="input_container">
              <label className="input_label" htmlFor="confirm_pass">Confirm New Password</label>
              <input
                id="confirm_pass"
                className="input input_field"
                placeholder="Confirm New Password"
                type="password"
                value={pass.confirmNewPassword}
                onChange={e => updatePassword({ ...pass, confirmNewPassword: e.target.value })}
              />
              {!isPasswordVaild && <label className="password_description">Password must be at least 8 characters long, include at least one letter, and at least one number.</label>}
            </div>

            {isLoading && <Spinner />}

            {!isLoading && (
              <div className="button_container">
                <button onClick={handleSavePassword}>Save Password</button>
                <button onClick={handleCloseDialogBox}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordDialogBox;
