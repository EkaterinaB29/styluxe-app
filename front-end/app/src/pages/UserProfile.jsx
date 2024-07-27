import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ProfessionalProfile from './ProfessionalProfile';
import ClientProfile from './ClientProfile';
import Notification from '../components/Notification';

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
