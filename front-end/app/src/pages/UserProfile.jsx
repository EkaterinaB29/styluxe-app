import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import ProfessionalProfile from './ProfessionalProfile.jsx';
import ClientProfile from './ClientProfile.jsx';
import Notification from '../components/Notification.jsx';

function UserProfile() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Notification text="Loading..." />;
  }

  if (!user) {
    return <Notification text="Please log in to view your profile." />;
  }

  return (
    <div>
      {user.type === 'professional' ? <ProfessionalProfile /> : <ClientProfile />}
    </div>
  );
}

export default UserProfile;
