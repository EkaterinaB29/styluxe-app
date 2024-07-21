import React from 'react';
import '../css/ProfilePicture.css';

const ProfilePicture = ({ imageUrl }) => {
    return (
        <div className="profile-picture">
            <img src={imageUrl} alt="Profile" />
        </div>
    );
};

export default ProfilePicture;
