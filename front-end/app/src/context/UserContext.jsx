import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const fetchUserProfile = async () => {
        setLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          try {
            const professionalResponse = await axios.get('http://88.200.63.148:8211/api/user/profile/professional', config);
            setUser(professionalResponse.data);
            setRole('Professional');
            setIsAuthenticated(true);
          } catch (error) {
            const clientResponse = await axios.get('http://88.200.63.148:8211/api/user/profile/client', config);
            setUser(clientResponse.data);
            setRole('Client');
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, role, isAuthenticated, setUser, setRole, setIsAuthenticated, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
