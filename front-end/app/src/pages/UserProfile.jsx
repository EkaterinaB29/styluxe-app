import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import ProfessionalProfile from './ProfessionalProfile';
import ClientProfile from './ClientProfile';
import Notification from '../components/Notification';
import axios from 'axios';
import Cookies from 'js-cookie';

function UserProfile() {
    const { user, loading, isAuthenticated, setUser, setLoading } = useContext(UserContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && !user) {
            const fetchUserProfile = async () => {
                setLoading(true);
                setError(null);
                try {
                    const token = Cookies.get('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const response = await axios.get('http://88.200.63.148:8211/api/user/profile', config);
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    setError('Failed to fetch profile');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProfile();
        }
    }, [isAuthenticated, user, setLoading, setUser]);

    if (loading) {
        return <Notification text="Loading..." />;
    }

    if (error) {
        return <Notification text={error} />;
    }

    if (!isAuthenticated) {
        return <Notification text="Please log in to view your profile." />;
    }

    return (
        <div>
            {user?.role === 'Professional' ? <ProfessionalProfile user={user} /> : <ClientProfile user={user} />}
        </div>
    );
}

export default UserProfile;
