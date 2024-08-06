import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notification from '../components/Notification';
import ProfessionalProfile from './ProfessionalProfile';
import ClientProfile from './ClientProfile';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://88.200.63.148:8211/api/user/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <Notification text="Loading..." />;
  }

  if (error) {
    return <Notification text={error} />;
  }

  if (!user) {
    return <Notification text="User not found" />;
  }

  return (
    <div>
      {user.role === 'Professional' ? <ProfessionalProfile user={user} /> : <ClientProfile user={user} />}
    </div>
  );
}

export default UserProfile;
