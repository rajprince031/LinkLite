import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userDetails } from "../redux/slices/UserDetails";
import '../style/CommonDialogBox.css';
import '../style/UpdateProfile.css';
import Spinner from "./Spinner";

const UpdateProfile = () => {
  const LOCALHOST_API = import.meta.env.VITE_LOCALHOST_API;
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector(state => state.userProfile);

  const [isOpen, setIsOpen] = useState(false);
  const [user, updateUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateUser({ firstName, lastName, email });
  }, [firstName, lastName, email]);

  const handleSaveProfile = () => {
    setIsLoading(true);
    if (!user.firstName.trim() || !user.email.trim()) {
      if (!user.email.trim()) updateUser({ ...user, email: "" });
      if (!user.firstName.trim()) updateUser({ ...user, firstName: "" });
      toast.error('Required fields are missing');
      setIsLoading(false);
      return;
    }

    axios.patch(`${LOCALHOST_API}/user/user-profile/update-profile`, user, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('authToken')
      },
    })
      .then(res => {
        setIsLoading(false);
        dispatch(userDetails(res.data.user));
        setIsOpen(false);
        toast.success(res.data.msg);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
        toast.error('Something went wrong!');
      });
  };

  const handleCloseDialogBox = () => {
    setIsOpen(false);
    updateUser({ firstName, lastName, email });
  };

  return (
    <div className="update_profile">
      <p onClick={() => setIsOpen(true)} className="update_profile_edit_button">
        Update Profile
      </p>

      {isOpen && (
        <div className="update_profile_dialog_box_overlay" onClick={handleCloseDialogBox}>
          <div className="update_profile_main_content_box" onClick={e => e.stopPropagation()}>
            <p className="update_profile_title">Update Profile</p>

            <div className="input_container">
              <label className="input_label" htmlFor="first_name_input">First Name</label>
              <input
                id="first_name_input"
                className="input input_field"
                placeholder="First Name"
                value={user.firstName}
                onChange={e => updateUser({ ...user, firstName: e.target.value })}
              />
            </div>

            <div className="input_container">
              <label className="input_label" htmlFor="last_name_input">Last Name</label>
              <input
                id="last_name_input"
                className="input input_field"
                placeholder="Last Name"
                value={user.lastName}
                onChange={e => updateUser({ ...user, lastName: e.target.value })}
              />
            </div>

            <div className="input_container">
              <label className="input_label" htmlFor="email_input">Username</label>
              <input
                id="email_input"
                className="input input_field"
                placeholder="Username"
                value={user.email}
                onChange={e => updateUser({ ...user, email: e.target.value })}
              />
            </div>
            {isLoading && <Spinner/>}
            {!isLoading && <div className="update_profile_button_container">
              <button onClick={handleSaveProfile}>Save Profile</button>
              <button onClick={handleCloseDialogBox}>Cancel</button>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
