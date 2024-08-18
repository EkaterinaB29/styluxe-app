import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/ProfessionalProfile.css";
import { UserContext } from "../context/UserContext";
import Notification from "../components/Notification";
import defaultProfileImg from "../images/profile.png";

const ProfessionalProfile = () => {
  const { user, setUser, isAuthenticated } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    profileImage: null,
    education_history: "",
    existingProfileImage: "",
  });
  const [portfolio, setPortfolio] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwShown, setPwShown] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        location: user.location || "",
        email: user.email || "",
        profileImage: user.profile_picture
          ? `http://88.200.63.148:8211${user.profile_picture}`
          : defaultProfileImg,
        education_history: user.education_history || "",
        existingProfileImage: user.profile_picture || "",
      });
      setPortfolio(user.portfolio || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handlePortfolioChange = (e) => {
    setPortfolio(e.target.files[0]);
  };

  const handlePasswordChange = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://88.200.63.148:8211/api/user/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setPasswordChangeMessage("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordChangeMessage(
        "Failed to update password. Please check your old password."
      );
      console.error(
        "Error updating password",
        error.response ? error.response.data : error.message
      );
    }
  };

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };

  const handleSave = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("education_history", formData.education_history);
    if (formData.profileImage && typeof formData.profileImage === "object") {
      formDataToSend.append("profile_picture", formData.profileImage);
    } else {
      formDataToSend.append("profile_picture", formData.existingProfileImage);
    }
    if (portfolio) {
      formDataToSend.append("portfolio", portfolio);
    }

    const token = localStorage.getItem("token");
    axios
      .put(
        "http://88.200.63.148:8211/api/user/profile/professional",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        axios
          .get("http://88.200.63.148:8211/api/user/profile/professional", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((getResponse) => {
            setUser(getResponse.data);
            setIsEditing(false);
          })
          .catch((getError) => {
            console.error(
              "Error fetching updated user data",
              getError.response ? getError.response.data : getError.message
            );
          });
      })
      .catch((error) => {
        console.error(
          "Error updating profile",
          error.response ? error.response.data : error.message
        );
      });
  };

  if (!isAuthenticated) {
    return <Notification text="Please log in to view your profile." />;
  }

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={
              typeof formData.profileImage === "string"
                ? formData.profileImage
                : defaultProfileImg
            }
            alt="Profile"
          />
          <div className="profile-info">
            <h2>
              {formData.firstName} {formData.lastName}
            </h2>
            <p>{formData.email}</p>
            <p>{formData.location}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="edit-form">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />

            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="education_history">Education History</label>
            <input
              type="text"
              name="education_history"
              value={formData.education_history}
              onChange={handleInputChange}
            />

            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleImageChange}
            />

            <label htmlFor="portfolio">Portfolio</label>
            <input
              type="file"
              name="portfolio"
              onChange={handlePortfolioChange}
            />

            <h3>Change Password</h3>
            <label htmlFor="oldPassword">Old Password</label>
            <div className="password-container">
              <input
                type={pwShown ? "text" : "password"}
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <label htmlFor="newPassword">New Password</label>
            <div className="password-container">
              <input
                type={pwShown ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="show-password">
              <input
                type="checkbox"
                id="showPassword"
                checked={pwShown}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            <button
              onClick={handlePasswordChange}
              className="change-password-button"
            >
              Change Password
            </button>
            {passwordChangeMessage && <p>{passwordChangeMessage}</p>}

            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
