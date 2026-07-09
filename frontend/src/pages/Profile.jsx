import toast from "react-hot-toast";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const updateProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.put(
        "/profile/update",
        {
          name: profile.name,
          email: profile.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Profile Updated Successfully");

    } catch (error) {

      console.log(error);

    }

  };

  const changePassword = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.put(
        "/profile/change-password",
        password,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Password Changed Successfully");

      setPassword({
        oldPassword: "",
        newPassword: ""
      });

    } catch (error) {

      toast.error("Wrong Old Password");

    }

  };

  return (

    <div className="profile-container">

      <h1 className="profile-title">👤 My Profile</h1>

      <br />

      <input
        value={profile.name}
        onChange={(e)=>
          setProfile({...profile,name:e.target.value})
        }
        placeholder="Name"
      />

      <br /><br />

      <input
        value={profile.email}
        onChange={(e)=>
          setProfile({...profile,email:e.target.value})
        }
        placeholder="Email"
      />

      <br /><br />

      <input
        value={profile.role}
        disabled
      />

      <br /><br />

      <button
className="profile-btn"
onClick={updateProfile}
>
        Save Changes
      </button>

      <hr className="profile-hr"/>

      <h2>Change Password</h2>

      <br />

      <input
        type="password"
        placeholder="Old Password"
        value={password.oldPassword}
        onChange={(e)=>
          setPassword({...password,oldPassword:e.target.value})
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="New Password"
        value={password.newPassword}
        onChange={(e)=>
          setPassword({...password,newPassword:e.target.value})
        }
      />

      <br /><br />

      <button
className="profile-btn"
onClick={changePassword}
>
        Change Password
      </button>

    </div>

  );

}

export default Profile;